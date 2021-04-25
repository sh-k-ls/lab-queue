import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
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
import { DeleteResult } from 'typeorm';

/**
 * Класс QueueController
 *
 * Предоставляет API очереди
 */
@Controller('api/v1/queue')
export class QueueController {
  constructor(
    private readonly queue: QueueService,
    private readonly request: RequestService,
    private readonly profile: ProfileService,
    private readonly group: GroupService,
    private readonly course: CourseService,
  ) {}

  /**
   * POST-запрос для создания очереди
   *
   *  @param {QueueDto} queue Параметры очереди
   *  @param {Request} req Запрос
   *  @returns {Promise<QueueEntity>} Запись очереди в базе данных
   *  @example  {
      id: 2,
      nameSubject: Программирование на Си,
      nameTeacher: [Ломовской],
      dateCreate: 11.02.2010,
      creatorId: 2,
      description: Description,
      groups: [ИУ7-21Б],
      timeCreate: 14:33,
    },
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public createQueue(
    @Body() queue: QueueDto,
    @Req() req: Request,
  ): Promise<QueueEntity> {
    queue.creatorId = (req.user as UserDto).id;
    return this.queue.pushQueue(queue);
  }

  /**
   * GET-запрос для получения всех очередей, доступных пользователю
   *
   *  @param {Request} req Запрос
   *  @returns {Promise<QueueDto[]>} Массив очередей из базы данных, доступных авторизованному пользователю
   *  @example  {
      id: 1,
      nameSubject: Планирование Эксперимента,
      nameTeacher: [Куров],
      dateCreate: 11.02.1873,
      creatorId: 1,
      description: Description1,
      groups: [ИУ7-81Б],
      timeCreate: 14:33,
    },
   {
      id: 2,
      nameSubject: Программирование на Си,
      nameTeacher: [Ломовской],
      dateCreate: 11.02.2010,
      creatorId: 2,
      description: Description2,
      groups: [ИУ7-21Б],
      timeCreate: 14:33,
    },
   */
  @UseGuards(JwtAuthGuard)
  @Get('available')
  public getAllQueuesAvailable(@Req() req: Request): Promise<QueueDto[]> {
    return this.queue.getByUserAvailableId(<UserDto>req.user);
  }

  /**
   * GET-запрос для получения всех очередей, созданных пользователем
   *
   *  @param {Request} req Запрос
   *  @returns {Promise<QueueDto[]>} Массив очередей из базы данных, созданных авторизованным пользователем
   *  @example  {
      id: 3,
      nameSubject: ЭПИ,
      nameTeacher: [Силантьева, Барышникова],
      dateCreate: 11.02.2021,
      creatorId: 3,
      description: Description2,
      groups: [ИУ7-82Б],
      timeCreate: 13:50,
    },
   {
      id: 4,
      nameSubject: ЦОС,
      nameTeacher: [Филиппов],
      dateCreate: 11.02.2021,
      creatorId: 3,
      description: Description3,
      groups: [ИУ7-82Б],
      timeCreate: 15:49,
    },
   */
  @UseGuards(JwtAuthGuard)
  @Get('creator')
  public getAllQueuesCreator(@Req() req: Request): Promise<QueueDto[]> {
    return this.queue.getByUserCreatorId(String((req.user as UserDto).id));
  }

  /**
   * PATCH-запрос для отметки сдачи лабы пользователем
   *
   *  @param {string} idQueue id очереди
   *  @param {string} idUser id пользователя
   *  @param {Request} req Запрос
   *  @returns {Promise<RequestDto>}  Заявка в очередь с булевым полем isSigned = false (не записан)
   *  @example  {
			queueId: 1,
			userId: 2,
			isSigned: false,
		},
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':idQueue/request/:idUser')
  public async setPassed(
    @Param('idQueue') idQueue: string,
    @Param('idUser') idUser: string,
    @Req() req: Request,
  ): Promise<RequestDto> {
    if (await this.request.isSigned(+idUser, +idQueue)) {
      return this.request.changeSigned(+idUser, +idQueue);
    }
    return this.request.getByUserIdQueueId(+idUser, +idQueue);
  }

  /**
   * DELETE-запрос для удаления очереди
   *
   *  @param {string} idQueue id очереди
   *  @param {Request} req Запрос
   *  @returns {Promise<DeleteResult>} Очередь удалена из базы данных
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':idQueue/delete')
  public async deleteQueue(
    @Param('idQueue') idQueue: string,
    @Req() req: Request,
  ): Promise<DeleteResult> {
    const queue = await this.queue.getByQueueId(idQueue);
    if (queue.creatorId === (req.user as UserDto).id) {
      return this.queue.deleteQueue(idQueue);
    } else {
      throw new HttpException(
        'idCreatorQueue not equal userID',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
  }

  /**
   * GET-запрос для получения всех очередей, в которые записан пользователь
   *
   *  @param {Request} req Запрос
   *  @returns {Promise<QueueDto[]>} Массив очередей из базы данных, в которые записан пользователь
   *  @example  {
			queueId: 1,
			userId: 2,
			isSigned: false,
		},
   */
  @UseGuards(JwtAuthGuard)
  @Get('signed')
  public getAllQueuesSigned(@Req() req: Request): Promise<QueueDto[]> {
    return this.queue.getByUserSignedId(<UserDto>req.user);
  }

  /**
   * GET-запрос для получения всех курсов
   *
   *  @param {Request} req Запрос
   *  @returns {Promise<Course[]>} Массив курсов
   *  @example  {
			course: ИУ7 бакалавры 4 курс
			groups: [ИУ7-81Б, ИУ7-82Б, ИУ7-83Б, ИУ7-84Б, ИУ7-85Б, ИУ7-86Б]
		},
   */
  @UseGuards(JwtAuthGuard)
  @Get('courses')
  public getAllCourses(@Req() req: Request): Promise<Course[]> {
    return this.course.findAll();
  }

  /**
   * GET-запрос для получения всех преподавателей
   *
   *  @param {Request} req Запрос
   *  @returns {Promise<string[]>} Массив преподавателей
   *  @example [Куров А.В., Рязанова Н.Ю., Толпинская Н.Б.],
   */
  @UseGuards(JwtAuthGuard)
  @Get('teachers')
  public getAllTeachers(@Req() req: Request): Promise<string[]> {
    return this.queue.findAllTeachers();
  }

  /**
   * GET-запрос для получения всех предметов
   *
   *  @param {Request} req Запрос
   *  @returns {Promise<string[]>} Массив предметов
   *  @example [Базы данных, Операционные системы, Математическая статистика],
   */
  @UseGuards(JwtAuthGuard)
  @Get('subjects')
  public getAllSubjects(@Req() req: Request): Promise<string[]> {
    return this.queue.findAllSubjects();
  }

  /**
   * GET-запрос для получения очереди по ее id
   *
   *  @param {string} idQueue id очереди
   *  @returns {Promise<QueueDto>} Очередь из базы данных
   *  @example  {
      id: 4,
      nameSubject: ЦОС,
      nameTeacher: [Филиппов],
      dateCreate: 11.02.2021,
      creatorId: 3,
      description: Description3,
      groups: [ИУ7-82Б],
      timeCreate: 15:49,
    },
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public getQueueById(@Param('id') idQueue: string): Promise<QueueDto> {
    return this.queue.getByQueueId(idQueue);
  }

  /**
   * GET-запрос для получения всех записей в очередь
   *
   *  @param {string} idQueue id очереди
   *  @returns {Promise<RequestDto[]>} Массив заявок из базы данных, относящихся к данной очереди
   *  @example  {
			queueId: 1,
			userId: 2,
			isSigned: true,
		},
   {
			queueId: 1,
			userId: 3,
			isSigned: true,
		},
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id/request')
  public getRequestsByQueueId(
    @Param('id') idQueue: string,
  ): Promise<RequestDto[]> {
    return this.request.getByQueueId(idQueue);
  }

  /**
   * POST-запрос для записи в очередь
   *
   *  @param {string} idQueue id очереди
   *  @param {RequestDto} queueReq сущность заявки
   *  @param {Request} req Запрос
   *  @returns {Promise<RequestEntity>}  Созданная заявка в очередь с в базе данных
   *  @example  {
			queueId: 5,
			userId: 1,
			isSigned: true,
		},
   */
  @UseGuards(JwtAuthGuard)
  @Post(':id/request')
  @HttpCode(HttpStatus.CREATED)
  public addRequestsByQueueId(
    @Param('id') idQueue: string,
    @Body() queueReq: RequestDto,
    @Req() req: Request,
  ): Promise<RequestEntity> {
    queueReq.userId = (req.user as UserDto).id;
    return this.request.pushRequest(queueReq);
  }

  /**
   * GET-запрос для получения информации из профиля пользователей, записанных в очередь
   *
   *  @param {string} idQueue id очереди
   *  @returns {Promise<ProfileDto[]>} Профили записанных в очередь пользователей
   *  @example  {
			name: Джон,
			surname: Чейнджми,
			course: 4,
			userId: 1,
			group: ИУ7-85Б,
			id: 1,
		},
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id/request/profile')
  public getProfilesByQueueId(
    @Param('id') idQueue: string,
  ): Promise<ProfileDto[]> {
    return this.profile.getProfilesByQueueId(idQueue);
  }

  /**
   * PATCH-запрос для изменения статуса заявки (записан или не записан)
   *
   *  @param {string} idQueue id очереди
   *  @param {RequestDto} queueReq Сущность заявки
   *  @param {Request} req Запрос
   *  @returns {Promise<RequestDto>} Измененная сущность заявки
   *  @example  {
			queueId: 5,
			userId: 1,
			isSigned: false,
		},
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id/request')
  public editRequestByQueueId(
    @Param('id') idQueue: string,
    @Body() queueReq: RequestDto,
    @Req() req: Request,
  ): Promise<RequestDto> {
    return this.request.changeSigned((req.user as UserDto).id, +idQueue);
  }

  /**
   * PUT-запрос для редактирования параметров очереди (предмет, преподаватели, группы, дата, время, описание)
   *
   *  @param {QueueDto} queue Сущность очереди
   *  @returns {Promise<QueueDto>} Очередь из базы данных
   *  @example  {
      id: 4,
      nameSubject: ЦОС,
      nameTeacher: [Филиппов],
      dateCreate: 11.02.2021,
      creatorId: 3,
      description: Новое описание,
      groups: [ИУ7-82Б, ИУ7-83Б],
      timeCreate: 15:49,
    },
   */
  @UseGuards(JwtAuthGuard)
  @Put()
  public editQueue(@Body() queue: QueueDto): Promise<QueueDto> {
    return this.queue.replaceQueue(queue);
  }

  /**
   * POST-запрос для записи в очередь
   *
   *  @param {string} queueId id очереди
   *  @param {Request} req Запрос
   *  @returns {Promise<RequestEntity>} Созданная заявка с булевым значением isSigned = true (пользователь записан)
   *  @example  {
			queueId: 5,
			userId: 5,
			isSigned: true,
		},
   */
  @UseGuards(JwtAuthGuard)
  @Post(':id/signIn')
  public signInQueue(
    @Param('id') queueId: string,
    @Req() req: Request,
  ): Promise<RequestEntity> {
    return this.request.pushRequest({
      queueId: +queueId,
      userId: (req.user as UserDto).id,
      isSigned: true,
    });
  }

  /**
   * PATCH-запрос для выхода из очереди (удаление заявки)
   *
   *  @param {string} queueId id очереди
   *  @param {Request} req Запрос
   *  @returns {Promise<void>} Заявка удалена, пользователь вышел из очереди
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id/signOut')
  public sighOutQueue(
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
