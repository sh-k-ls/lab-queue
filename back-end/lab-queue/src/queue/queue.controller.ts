import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueDto } from '../shared/front-back-end/queue.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RequestService } from '../request/request.service';
import { RequestDto } from '../shared/front-back-end/request.dto';
import { ProfileDto } from '../shared/front-back-end/profile.dto';
import { ProfileService } from '../profile/profile.service';
import { Request } from 'express';
import { UserDto } from '../shared/front-back-end/user.dto';
import { RequestEntity } from '../database.entities/request.entity';

@Controller('api/v1/queue')
export class QueueController {
  constructor(
    private readonly queue: QueueService,
    private readonly request: RequestService,
    private readonly profile: ProfileService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createQueue(@Body() queue: QueueDto): number {
    return this.queue.pushQueue(queue);
  }

  @UseGuards(JwtAuthGuard)
  @Get('available')
  async getAllQueuesAvailable(@Req() req: Request): Promise<QueueDto[]> {
    return await this.queue.getByUserAvailableId(<UserDto>req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('creator')
  getAllQueuesCreator(@Req() req: Request): QueueDto[] {
    return this.queue.getByUserCreatorId(<UserDto>req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('signed')
  async getAllQueuesSigned(@Req() req: Request): Promise<QueueDto[]> {
    return await this.queue.getByUserSignedId(<UserDto>req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getQueueById(@Param('id') idQueue: string): QueueDto {
    return this.queue.getByQueueId(+idQueue);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/request')
  getRequestsByQueueId(@Param('id') idQueue: string): Promise<RequestDto[]> {
    return this.request.getByQueueId(idQueue);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/request')
  @HttpCode(HttpStatus.CREATED)
  addRequestsByQueueId(
    @Param('id') idQueue: string,
    @Body() queueReq: RequestDto,
    @Req() req: Request,
  ): Promise<RequestEntity> {
    queueReq.userId = (req.user as UserDto).id;
    return this.request.pushRequest(queueReq);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/request/profile')
  async getProfilesByQueueId(
    @Param('id') idQueue: string,
  ): Promise<ProfileDto[]> {
    return await this.profile.getProfilesByQueueId(idQueue);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/request')
  editRequestByQueueId(
    @Param('id') idQueue: string,
    @Body() queueReq: RequestDto,
    @Req() req: Request,
  ): RequestDto {
    return this.request.changeSigned((req.user as UserDto).id, +idQueue);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  editQueueById(@Param('id') id: string, @Body() queue: QueueDto): QueueDto {
    return queue;
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/signIn')
  signInQueue(
    @Param('id') queueId: string,
    @Req() req: Request,
  ): Promise<RequestEntity> {
    return this.request.pushRequest({
      queueId: +queueId,
      userId: (req.user as UserDto).id,
      isSigned: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/signOut')
  sighOutQueue(
    @Param('id') queueId: string,
    @Req() req: Request,
  ): Promise<void> {
    return this.request.delRequest({
      queueId: +queueId,
      userId: (req.user as UserDto).id,
      isSigned: true,
    });
  }
}
