import { Test, TestingModule } from '@nestjs/testing';
import { QueueService } from './queue.service';
import { RequestService } from '../request/request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database.entities/user.entity';
import { RequestEntity } from '../database.entities/request.entity';
import { QueueEntity } from '../database.entities/queue.entity';
import { ProfileEntity } from '../database.entities/profile.entity';
import { CourseEntity } from '../database.entities/course.entity';
import { GroupEntity } from '../database.entities/group.entity';
import { UsersService } from '../users/users.service';

describe('QueueService', () => {
  let service: QueueService;

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
          RequestEntity,
          QueueEntity,
          ProfileEntity,
          CourseEntity,
          GroupEntity,
          UserEntity,
        ]),
      ],
      providers: [QueueService, RequestService, UsersService],
    }).compile();

    service = module.get<QueueService>(QueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
