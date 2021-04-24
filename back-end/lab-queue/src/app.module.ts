import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueueController } from './queue/queue.controller';
import { QueueService } from './queue/queue.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RequestService } from './request/request.service';
import { ProfileService } from './profile/profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './ormconfig';
import { RequestEntity } from './database.entities/request.entity';
import { QueueEntity } from './database.entities/queue.entity';
import { ProfileEntity } from './database.entities/profile.entity';
import { CourseEntity } from './database.entities/course.entity';
import { GroupEntity } from './database.entities/group.entity';
import { GroupService } from './group/group.service';

// @ts-ignore
const typeOrmConfig: 'default' | 'deploy' =
  process.env.DB_ENVIRONMENT || 'default';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forFeature([
      RequestEntity,
      QueueEntity,
      ProfileEntity,
      CourseEntity,
      GroupEntity,
    ]),
    TypeOrmModule.forRoot(ormConfig[typeOrmConfig]),
  ],
  controllers: [AppController, QueueController],
  providers: [
    AppService,
    QueueService,
    RequestService,
    ProfileService,
    GroupService,
  ],
})
export class AppModule {}
