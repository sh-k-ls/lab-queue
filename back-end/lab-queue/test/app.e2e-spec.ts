import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from "../src/app.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequestEntity } from "../src/database.entities/request.entity";
import { QueueEntity } from "../src/database.entities/queue.entity";
import { ProfileEntity } from "../src/database.entities/profile.entity";
import { CourseEntity } from "../src/database.entities/course.entity";
import { GroupEntity } from "../src/database.entities/group.entity";
import { UserEntity } from "../src/database.entities/user.entity";

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const queue = { id: 1,
    nameSubject: 'Планирование Эксперимента',
    nameTeacher: [ 'Куров' ],
    dateCreate: '1873-02-11',
    timeCreate: '14:33:00',
    groups: [ 'ИУ7-81Б', 'ИУ7-82Б', 'ИУ7-83Б', 'ИУ7-84Б', 'ИУ7-85Б' ],
    creatorId: 1,
    description: 'Description1' }

  beforeAll(async () => {
    const appTest: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([
          RequestEntity,
          QueueEntity,
          ProfileEntity,
          CourseEntity,
          GroupEntity,
          UserEntity,
        ]),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'queue',
          password: 'queue1337',
          database: 'queue_test',
          entities: [__dirname + '../../src/database.entities/*.entity{.ts,.js}'],
          migrations: ['migration/*{.ts,.js}'],
          cli: {
            migrationsDir: 'migration',
          },
          synchronize: true,
        }),
        AppModule
      ],
    }).compile();
    app = await appTest.createNestApplication();
    await app.init();
  });

  it('Проверка списка доступных очередей',   async() => {
    let user = { username: 'andrey', password: 'hi' };
    let response = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send(user)
      .expect(201);

    const jwtToken = response.body.token;

    response = await request(app.getHttpServer())
      .get('/api/v1/queue/available')
      .auth(jwtToken, { type: 'bearer' })
      .expect(200);
    let queues = response.body;
    expect(queues).toContainEqual(queue);
  });

  it('Запись в очередь и проверка, появилась ли заявка, и появилась ли очередь в списке записанных',   async() => {
    let user = { username: 'andrey', password: 'hi' };
    let profile = {
      id: 2,
      userId: 2,
      name: 'Andrey',
      surname: 'Ko',
      group: 'ИУ7-85Б',
      course: 'ИУ7 Bachelor 4 курс'
    };
    let response = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send(user)
      .expect(201);
    const jwtToken = response.body.token;

    await request(app.getHttpServer())
      .post('/api/v1/queue/1/request')
      .send({queueId: 1, userId: 2, isSigned: true})
      .auth(jwtToken, { type: 'bearer' })
      .expect(201);

    response = await request(app.getHttpServer())
      .get('/api/v1/queue/signed')
      .auth(jwtToken, { type: 'bearer' })
      .expect(200);
    let queues = response.body;
    expect(queues).toContainEqual( queue);

    response = await request(app.getHttpServer())
      .get('/api/v1/queue/1/request/profile')
      .send({queueId: 1, userId: 2, isSigned: true})
      .auth(jwtToken, { type: 'bearer' })
      .expect(200);
    let requests_profiles = response.body;
    expect(requests_profiles).toContainEqual(profile);
  });

  it('Создание очереди и проверка списка созданных очередей',   async() => {
    let user = { username: 'andrey', password: 'hi' };
    let newQueue = {
      id: 3,
      nameSubject: 'a',
      nameTeacher: [ 'Куров' ],
      dateCreate: '1873-02-11',
      timeCreate: '14:33:00',
      groups: [ 'ИУ7-85Б' ],
      creatorId: 2,
      description: 'a' };

    let response = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send(user)
      .expect(201);

    let jwtToken = response.body.token;

    await request(app.getHttpServer())
      .post('/api/v1/queue')
      .send(newQueue)
      .auth(jwtToken, { type: 'bearer' })
      .expect(201);

    response = await request(app.getHttpServer())
      .get('/api/v1/queue/creator')
      .auth(jwtToken, { type: 'bearer' })
      .expect(200);
    let queues = response.body;
    expect(queues).toContainEqual(newQueue);
  });

  it('Изменение очереди',   async() => {
    let user = { username: 'andrey', password: 'hi' };
    let queue2 = {
      id: 2,
      nameSubject: 'Очередь',
      nameTeacher: [ 'О' ],
      dateCreate: '1873-02-11',
      timeCreate: '14:33:00',
      groups: [ 'ИУ7-85Б' ],
      creatorId: 2,
      description: 'dddd'
    };
    let response = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send(user)
      .expect(201);

    let jwtToken = response.body.token;

    await request(app.getHttpServer())
      .put('/api/v1/queue')
      .send(queue2)
      .auth(jwtToken, { type: 'bearer' })
      .expect(200);

    response = await request(app.getHttpServer())
      .get('/api/v1/queue/creator')
      .auth(jwtToken, { type: 'bearer' })
      .expect(200);
    let queues = response.body;
    expect(queues).toContainEqual(queue2);
  });

  afterAll(async () => {
    await app.close();
  })
});
