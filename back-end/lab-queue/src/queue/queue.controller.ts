import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueDto } from '../shared/classes/queue.dto';

@Controller('api/v1/queue')
export class QueueController {
  constructor(private queueService: QueueService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createQueue(@Body() queue: QueueDto): number {
    return this.queueService.pushQueue(queue);
  }

  @Get()
  getQueue(): QueueDto[] {
    return this.queueService.getAll();
  }

  @Get(':id')
  getQueueById(@Param('id') idQueue: number): QueueDto {
    return this.queueService.getById(idQueue);
  }

  @Patch(':id')
  editQueueById(@Param('id') id: number, @Body() queue: QueueDto): QueueDto {
    return queue;
  }

  @Post(':id/sighIn')
  signInQueue(
    @Param('id') idQueue: number,
    @Body('userId') userId: number,
  ): QueueDto {
    return this.queueService.getById(idQueue);
  }

  @Patch(':id/sighOut')
  sighOutQueue(
    @Param('id') idQueue: number,
    @Body('userId') userId: number,
  ): QueueDto {
    return this.queueService.getById(idQueue);
  }
}
