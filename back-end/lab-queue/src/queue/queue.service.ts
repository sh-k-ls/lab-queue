import { Injectable } from '@nestjs/common';
import { QueueDto } from '../shared/front-back-end/queue.dto';
import { RequestService } from '../request/request.service';
import { InjectRepository } from '@nestjs/typeorm';
import { QueueEntity } from '../database.entities/queue.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { RequestEntity } from '../database.entities/request.entity';
import { CourseEntity } from '../database.entities/course.entity';
import { GroupEntity } from '../database.entities/group.entity';
import { UserDto } from '../shared/front-back-end/user.dto';
import { RequestDto } from '../shared/front-back-end/request.dto';
import { UserEntity } from '../database.entities/user.entity';

@Injectable()
export class QueueService {
  constructor(
    private readonly request: RequestService,
    private readonly user: UsersService,
    @InjectRepository(QueueEntity)
    private queueRepository: Repository<QueueEntity>,
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
    @InjectRepository(GroupEntity)
    private groupRepository: Repository<GroupEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(RequestEntity)
    private requestRepository: Repository<RequestEntity>,
  ) {}

  public async getDTO(queueEntity: QueueEntity): Promise<QueueDto> {
    return {
      id: queueEntity.id,
      nameSubject: queueEntity.nameSubject,
      nameTeacher: queueEntity.nameTeacher,
      dateCreate: queueEntity.dateCreate,
      timeCreate: queueEntity.timeCreate,
      groups: queueEntity.groups.map((group) => group.groupName),
      creatorId: queueEntity.creator.id,
      description: queueEntity.description,
    };
  }

  public async getByUserAvailableId(user: UserDto): Promise<QueueDto[]> {
    const creatorQueues: QueueDto[] = await this.getByUserCreatorId(
      String(user.id),
    );
    const signedQueues: QueueDto[] = await this.getByUserSignedId(user);
    const userGroup = await this.groupRepository.findOne({
      where: { groupName: user.group },
    });

    const allQueues = await this.queueRepository
      .find({ relations: ['groups'] })
      .then();

    const allQueuesDto = await Promise.all(
      allQueues.map((queueEntity) => this.getDTO(queueEntity)),
    );
    return allQueuesDto.filter(
      (queue) =>
        !!queue.groups.find((group) => group === userGroup.groupName) &&
        creatorQueues.findIndex((value) => queue.id === value.id) === -1 &&
        signedQueues.findIndex((value) => queue.id === value.id) === -1,
    );
  }

  async getByUserCreatorId(id: string): Promise<QueueDto[]> {
    const userEntity = await this.userRepository.findOne({
      where: { id: +id },
    });
    const queueEntities = await this.queueRepository
      .find({
        where: { creator: userEntity },
        relations: ['groups', 'requests'],
      })
      .then();
    return Promise.all(
      queueEntities.map((queueEntity) => this.getDTO(queueEntity)),
    );
  }

  public async getByUserSignedId(user: UserDto): Promise<QueueDto[]> {
    const requests: RequestDto[] = await this.request.getByUserId(user.id);
    const signedQueues: QueueDto[] = [];
    for (const request of requests) {
      signedQueues.push(await this.getByQueueId(String(request.queueId)));
    }

    return signedQueues;
  }

  async getByQueueId(id: string): Promise<QueueDto> {
    const queueEntities = await this.queueRepository
      .findOne({ where: { id: id }, relations: ['groups', 'requests'] })
      .then();
    return this.getDTO(queueEntities);
  }

  async pushQueue(request: QueueDto): Promise<QueueEntity> {
    const userEntity = await this.userRepository.findOne({
      where: { id: request.creatorId },
    });
    const allGroups = request.groups;
    const requests: RequestEntity[] = [];
    const groups: GroupEntity[] = [];
    for (const currGroup of allGroups) {
      const groupEntity = this.groupRepository.findOne({
        where: { groupName: currGroup },
      });
      groups.push(await groupEntity);
    }
    const req = new QueueEntity();
    req.id = request.id;
    req.nameSubject = request.nameSubject;
    req.nameTeacher = request.nameTeacher;
    req.dateCreate = request.dateCreate;
    req.timeCreate = request.timeCreate;
    req.description = request.description;
    req.creator = userEntity;
    req.requests = requests;
    req.groups = groups;

    return this.queueRepository.save(req);
  }

  public async replaceQueue(queue: QueueDto): Promise<QueueDto> {
    const queueToReplace = await this.queueRepository
      .findOne({ where: { id: queue.id }, relations: ['groups'] })
      .then();
    const allGroups = queue.groups;
    const groups: GroupEntity[] = [];
    for (const currGroup of allGroups) {
      const groupEntity = this.groupRepository.findOne({
        where: { groupName: currGroup },
      });
      groups.push(await groupEntity);
    }

    queueToReplace.nameSubject = queue.nameSubject;
    queueToReplace.nameTeacher = queue.nameTeacher;
    queueToReplace.dateCreate = queue.dateCreate;
    queueToReplace.timeCreate = queue.timeCreate;
    queueToReplace.description = queue.description;
    queueToReplace.groups = groups;

    this.queueRepository.save(queueToReplace);

    return this.getDTO(queueToReplace);
  }

  public async findAllSubjects(): Promise<string[]> {
    const queues = await this.queueRepository.find();
    const nameSubjects = queues.map((queue) => queue.nameSubject);
    return nameSubjects.filter(
      (item, pos) => nameSubjects.indexOf(item) == pos,
    );
  }

  public async findAllTeachers(): Promise<string[]> {
    const queueEntities = await this.queueRepository.find();
    const teachers = queueEntities.map(
      (queueEntity) => queueEntity.nameTeacher,
    );
    return teachers.reduce((acc, cur) => [...acc, ...cur]);
  }

  public async deleteQueue(idQueue: string): Promise<DeleteResult> {
    const requests = await this.requestRepository.find({
      where: { queue: idQueue },
    });
    requests.map(
      async (request) => await this.requestRepository.delete(request.id),
    );

    return await this.queueRepository.delete(idQueue);
  }
}
