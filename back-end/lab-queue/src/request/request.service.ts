import { Injectable } from '@nestjs/common';
import { RequestDto } from '../shared/front-back-end/request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestEntity } from '../database.entities/request.entity';
import { UserEntity } from '../database.entities/user.entity';
import { UsersService } from '../users/users.service';
import { QueueEntity } from '../database.entities/queue.entity';

@Injectable()
export class RequestService {
  constructor(
    private readonly user: UsersService,
    @InjectRepository(RequestEntity)
    private requestRepository: Repository<RequestEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(QueueEntity)
    private queueRepository: Repository<QueueEntity>,
  ) {}

  public getDTO(requestEntity: RequestEntity): RequestDto {
    return {
      queueId: requestEntity.queue.id,
      userId: requestEntity.user.id,
      isSigned: requestEntity.isActive,
    };
  }

  findAll(): Promise<RequestEntity[]> {
    return this.requestRepository.find({ relations: ['user', 'queue'] });
  }

  async getByQueueId(id: string): Promise<RequestDto[]> {
    const requestEntities = await this.requestRepository
      .find({ where: { queue: id, isActive: true } })
      .then();
    return requestEntities.map((request) => this.getDTO(request));
  }

  async getByUserId(userId: number): Promise<RequestDto[]> {
    const requestEntities = await this.requestRepository
      .find({ where: { user: userId, isActive: true } })
      .then();
    return requestEntities.map((request) => this.getDTO(request));
  }

  public async isSigned(userId: number, queueId: number): Promise<RequestDto> {
    const userEntity = await this.userRepository.findOne({
      where: { id: userId },
    });
    const queueEntity = await this.queueRepository.findOne({
      where: { id: queueId },
    });
    const requestEntity = await this.requestRepository
      .findOne({ where: { user: userEntity, queue: queueEntity } })
      .then();
    return Promise.resolve(this.getDTO(requestEntity));
  }

  public async getByUserIdQueueId(
    userId: number,
    queueId: number,
  ): Promise<RequestDto> {
    const allRequests = await this.requestRepository.find().then();

    const allRequestsDto = await Promise.all(
      allRequests.map((queueEntity) => this.getDTO(queueEntity)),
    );

    return allRequestsDto.find(
      (req) =>
        req.userId === userId &&
        req.queueId === queueId &&
        req.isSigned === true,
    );
  }

  async pushRequest(request: RequestDto): Promise<RequestEntity> {
    const userEntity = await this.userRepository.findOne({
      where: { id: request.userId },
    });
    const queueEntity = await this.queueRepository.findOne({
      where: { id: request.queueId },
    });
    const req = new RequestEntity();
    req.user = userEntity;
    req.queue = queueEntity;
    req.isActive = request.isSigned;

    return this.requestRepository.save(req);
  }

  public async changeSigned(
    userId: number,
    queueId: number,
  ): Promise<RequestDto> {
    let resRequest: RequestDto;
    const userEntity = await this.userRepository.findOne({
      where: { id: userId },
    });
    const queueEntity = await this.queueRepository.findOne({
      where: { id: queueId },
    });
    for (const request of await this.findAll()) {
      if (
        request.user.id === userEntity.id &&
        request.queue.id === queueEntity.id &&
        request.isActive === true
      ) {
        request.isActive = !request.isActive;
        await this.requestRepository.save(request);
        resRequest = this.getDTO(request);
      }
    }
    return resRequest;
  }

  async delRequest(request: RequestDto): Promise<void> {
    const userEntity = await this.userRepository.findOne({
      where: { id: request.userId },
    });
    const queueEntity = await this.queueRepository.findOne({
      where: { id: request.queueId },
    });
    await this.requestRepository.delete({
      user: userEntity,
      queue: queueEntity,
    });
  }
}
