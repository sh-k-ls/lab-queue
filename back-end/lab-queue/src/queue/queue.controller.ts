import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
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
import { QueueEntity } from '../database.entities/queue.entity';
import { GroupService } from '../group/group.service';
import { CourseService } from '../course/course.service';
import { Course } from '../shared/front-back-end/course.dto';

@Controller('api/v1/queue')
export class QueueController {
  constructor(
    private readonly queue: QueueService,
    private readonly request: RequestService,
    private readonly profile: ProfileService,
    private readonly group: GroupService,
    private readonly course: CourseService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createQueue(
    @Body() queue: QueueDto,
    @Req() req: Request,
  ): Promise<QueueEntity> {
    queue.creatorId = (req.user as UserDto).id;
    return this.queue.pushQueue(queue);
  }

  @UseGuards(JwtAuthGuard)
  @Get('available')
  async getAllQueuesAvailable(@Req() req: Request): Promise<QueueDto[]> {
    return await this.queue.getByUserAvailableId(<UserDto>req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('creator')
  async getAllQueuesCreator(@Req() req: Request): Promise<QueueDto[]> {
    return await this.queue.getByUserCreatorId(
      String((req.user as UserDto).id),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':idQueue/request/:idUser')
  public async setPassed(
    @Param('idQueue') idQueue: string,
    @Param('idUser') idUser: string,
    @Req() req: Request,
  ): Promise<RequestDto> {
    if (await this.request.isSigned(+idUser, +idQueue)) {
      return await this.request.changeSigned(+idUser, +idQueue);
    }
    return await this.request.getByUserIdQueueId(+idUser, +idQueue);
  }

  @UseGuards(JwtAuthGuard)
  @Get('signed')
  async getAllQueuesSigned(@Req() req: Request): Promise<QueueDto[]> {
    return await this.queue.getByUserSignedId(<UserDto>req.user);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('groups')
  // getAllGroups(@Req() req: Request): Promise<string[]> {
  //   return this.group.findAll();
  // }

  @UseGuards(JwtAuthGuard)
  @Get('courses')
  getAllCourses(@Req() req: Request): Promise<Course[]> {
    return this.course.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('teachers')
  getAllTeachers(@Req() req: Request): Promise<string[]> {
    return this.queue.findAllTeachers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('subjects')
  getAllSubjects(@Req() req: Request): Promise<string[]> {
    return this.queue.findAllSubjects();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getQueueById(@Param('id') idQueue: string): Promise<QueueDto> {
    return this.queue.getByQueueId(idQueue);
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
  async editRequestByQueueId(
    @Param('id') idQueue: string,
    @Body() queueReq: RequestDto,
    @Req() req: Request,
  ): Promise<RequestDto> {
    return this.request.changeSigned((req.user as UserDto).id, +idQueue);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  editQueue(@Body() queue: QueueDto): Promise<QueueDto> {
    return this.queue.replaceQueue(queue);
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
