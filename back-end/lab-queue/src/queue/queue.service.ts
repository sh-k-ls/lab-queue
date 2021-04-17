import { Injectable } from '@nestjs/common';
import { QueueDto } from '../shared/front-back-end/queue.dto';
import { RequestService } from '../request/request.service';
import { UserDto } from '../shared/front-back-end/user.dto';
import { RequestDto } from '../shared/front-back-end/request.dto';
import { ProfileDto } from '../shared/front-back-end/profile.dto';

@Injectable()
export class QueueService {
  constructor(private readonly request: RequestService) {}

  private queues: QueueDto[] = [
    {
      id: 1,
      nameSubject: 'Планирование Эксперимента',
      nameTeacher: ['Куров'],
      dateCreate: '11.02.1873',
      creatorId: 1,
      description: 'Description1',
      groups: ['iu7'],
      timeCreate: '14:33',
    },
    {
      id: 2,
      nameSubject: 'Программирование на Си',
      nameTeacher: ['Ломовской'],
      dateCreate: '11.02.2010',
      creatorId: 2,
      description: 'Description2',
      groups: ['iu7'],
      timeCreate: '14:33',
    },
    {
      id: 3,
      nameSubject: 'ТИСД',
      nameTeacher: ['Силантьева', 'Барышникова'],
      dateCreate: '11.02.2017',
      creatorId: 2,
      description: 'Description3',
      groups: ['iu7'],
      timeCreate: '14:33',
    },
  ];

  public async getByUserAvailableId(user: UserDto): Promise<QueueDto[]> {
    const creatorQueues: QueueDto[] = this.getByUserCreatorId(user);
    const signedQueues: QueueDto[] = await this.getByUserSignedId(user);

    return this.queues.filter(
      (queue) =>
        // TODO groups index
        queue.groups[0] === user.group &&
        creatorQueues.findIndex((value) => queue.id === value.id) === -1 &&
        signedQueues.findIndex((value) => queue.id === value.id) === -1,
    );
  }

  public getByUserCreatorId(user: UserDto): QueueDto[] {
    return this.queues.filter((queue) => user.id == queue.creatorId);
  }

  public async getByUserSignedId(user: UserDto): Promise<QueueDto[]> {
    const requests: RequestDto[] = await this.request.getByUserId(user.id);
    const signedQueues: QueueDto[] = [];
    for (const request of requests) {
      signedQueues.push(this.getByQueueId(request.queueId));
    }

    return signedQueues;
  }

  public getByQueueId(idQueue: number): QueueDto {
    return this.queues.find((queue) => queue.id === idQueue);
  }

  public pushQueue(queue: QueueDto): number {
    queue.id = this.queues.length;
    return this.queues.push(queue);
  }
}
