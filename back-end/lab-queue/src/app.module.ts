import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueueController } from './queue/queue.controller';
import { QueueService } from './queue/queue.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RequestService } from './request/request.service';
import { ProfileService } from './profile/profile.service';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [AppController, QueueController],
  providers: [AppService, QueueService, RequestService, ProfileService],
})
export class AppModule {}
