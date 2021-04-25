import { Test, TestingModule } from '@nestjs/testing';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { RequestService } from '../request/request.service';
import { ProfileService } from '../profile/profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { QueueEntity } from '../database.entities/queue.entity';
import { CourseEntity } from '../database.entities/course.entity';
import { GroupEntity } from '../database.entities/group.entity';
import { UserEntity } from '../database.entities/user.entity';
import { RequestEntity } from '../database.entities/request.entity';
import { ProfileEntity } from '../database.entities/profile.entity';
import { GroupService } from '../group/group.service';
import { CourseService } from '../course/course.service';

describe('QueueController', () => {
  let controller: QueueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'queue',
          password: 'queue1337',
          database: 'bmstu_queue',
          entities: [
            __dirname + '../../../src/database.entities/*.entity{.ts,.js}',
          ],
          migrations: ['migration/*{.ts,.js}'],
          cli: {
            migrationsDir: 'migration',
          },
          synchronize: true,
        }),
        TypeOrmModule.forFeature([
          QueueEntity,
          CourseEntity,
          GroupEntity,
          UserEntity,
          RequestEntity,
          ProfileEntity,
        ]),
        AppModule,
      ],
      controllers: [QueueController],
      providers: [
        QueueService,
        RequestService,
        ProfileService,
        UsersService,
        GroupService,
        CourseService,
      ],
    }).compile();

    controller = module.get<QueueController>(QueueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
