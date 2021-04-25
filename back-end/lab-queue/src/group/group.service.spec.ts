import { Test, TestingModule } from '@nestjs/testing';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from '../database.entities/group.entity';

describe('GroupService', () => {
  let service: GroupService;

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
        TypeOrmModule.forFeature([GroupEntity]),
      ],
      providers: [GroupService],
    }).compile();

    service = module.get<GroupService>(GroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
