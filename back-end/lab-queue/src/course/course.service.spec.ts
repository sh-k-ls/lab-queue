import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from '../database.entities/group.entity';
import { CourseEntity } from '../database.entities/course.entity';

describe('CourseService', () => {
  let service: CourseService;

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
        TypeOrmModule.forFeature([CourseEntity]),
      ],
      providers: [CourseService],
    }).compile();

    service = module.get<CourseService>(CourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
