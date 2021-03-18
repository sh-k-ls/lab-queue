import { Injectable } from '@nestjs/common';
import { QueueDto } from '../shared/classes/queue.dto';

@Injectable()
export class QueueService {
  private queue: QueueDto[] = [
    {
      name: 'Andrey',
      nameTeacher: 'Kurov',
      dateCreate: '11.02.1873',
      creatorName: 'Author',
      description: 'Description1',
    },
    {
      name: 'Kolya',
      nameTeacher: 'Lomovskoy',
      dateCreate: '11.02.2010',
      creatorName: 'Author',
      description: 'Description2',
    },
    {
      name: 'Olya',
      nameTeacher: 'Silantieva',
      dateCreate: '11.02.2017',
      creatorName: 'Author',
      description: 'Description3',
    },
  ];

  public getAll(): QueueDto[] {
    return this.queue;
  }

  public getById(id: number): QueueDto {
    return this.queue[id];
  }

  public pushQueue(queue: QueueDto): number {
    return this.queue.push(queue) - 1;
  }
}
