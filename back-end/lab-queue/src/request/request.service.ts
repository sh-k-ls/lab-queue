import { Injectable } from '@nestjs/common';
import { RequestDto } from '../shared/front-back-end/request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestEntity } from '../database.entities/request.entity';
import { UserEntity } from '../database.entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class RequestService {
  constructor(
    private readonly user: UsersService,
    @InjectRepository(RequestEntity)
    private requestRepository: Repository<RequestEntity>,
  ) {}

  private requests: RequestDto[] = [
    {
      queueId: 1,
      userId: 2,
      isSigned: true,
    },
    {
      queueId: 2,
      userId: 1,
      isSigned: true,
    },
  ];

  findAll(): Promise<RequestEntity[]> {
    return this.requestRepository.find();
  }

  async getByQueueId(id: string): Promise<RequestDto[]> {
    const requestEntities = await this.requestRepository
      .find({ where: { queue: id, isActive: true } })
      .then();
    return requestEntities.map((request) => request.getDTO());
  }

  async getByUserId(userId: number): Promise<RequestDto[]> {
    const requestEntities = await this.requestRepository
      .find({ where: { user: userId, isActive: true } })
      .then();
    return requestEntities.map((request) => request.getDTO());
  }

	public isSigned(userId: number): boolean {
    return !!(this.requests.find(elem => elem.userId === userId));
  }

  public getByUserIdQueueId(userId: number, queueId: number): RequestDto {
    return this.requests.find(req =>
      req.userId === userId &&
      req.queueId === queueId &&
      req.isSigned === true);
  }

	public changeSigned(userId: number, queueId: number): RequestDto {
		let resRequest: RequestDto;
		for (const request of this.requests) {
			if (
				request.userId === userId &&
				request.queueId === queueId &&
				request.isSigned === true
			) {
				request.isSigned = !request.isSigned;
				resRequest = request;
			}
		}
		return resRequest;
	}
  async pushRequest(request: RequestDto): Promise<RequestEntity> {
    const userEntity = await this.user.findOne(String(request.userId));
    //TODO: add queue entity to condition
    const req = new RequestEntity();
    req.user = userEntity;
    req.isActive = request.isSigned;

    return this.requestRepository.save(req);
  }

  public async changeSigned(
    userId: number,
    queueId: number,
  ): Promise<RequestDto> {
    let resRequest: RequestDto;
    const userEntity = await this.user.findOne(String(userId));
    //TODO: add queue entity to condition
    for (const request of await this.findAll()) {
      if (
        request.user === userEntity &&
        //request.queueId === queueEntity &&
        request.isActive === true
      ) {
        request.isActive = !request.isActive;
        resRequest = request.getDTO();
      }
    }
    return resRequest;
  }

  async delRequest(request: RequestDto): Promise<void> {
    const userEntity = await this.user.findOne(String(request.userId));
    //TODO: add queue entity to condition
    await this.requestRepository.delete({ user: userEntity });
  }
}
