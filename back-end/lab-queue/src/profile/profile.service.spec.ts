import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { RequestService } from '../request/request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from '../database.entities/profile.entity';
import { UserEntity } from '../database.entities/user.entity';
import { UsersService } from '../users/users.service';
import { RequestEntity } from '../database.entities/request.entity';
import { QueueEntity } from '../database.entities/queue.entity';

describe('ProfileService', () => {
  let service: ProfileService;

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
          ProfileEntity,
          UserEntity,
          RequestEntity,
          QueueEntity,
        ]),
      ],
      providers: [ProfileService, RequestService, UsersService],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
