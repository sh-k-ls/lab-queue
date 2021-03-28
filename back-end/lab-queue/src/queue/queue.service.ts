import { Injectable } from '@nestjs/common';
import { QueueDto } from '../shared/classes/queue.dto';
import { RequestService } from '../request/request.service';
import { UserDto } from '../shared/classes/user.dto';
import { RequestDto } from '../shared/classes/request.dto';

@Injectable()
export class QueueService {
	constructor(private readonly request: RequestService) {}

	private queues: QueueDto[] = [
		{
			id: 1,
			name: 'Планирование Эксперимента',
			nameTeacher: 'Kurov',
			dateCreate: '11.02.1873',
			creatorID: 1,
			description: 'Description1',
			group: 'iu7',
		},
		{
			id: 2,
			name: 'Программирование на Си',
			nameTeacher: 'Lomovskoy',
			dateCreate: '11.02.2010',
			creatorID: 2,
			description: 'Description2',
			group: 'iu7',
		},
		{
			id: 3,
			name: 'ТИСД',
			nameTeacher: 'Silantieva',
			dateCreate: '11.02.2017',
			creatorID: 2,
			description: 'Description3',
			group: 'iu7',
		},
	];

	public getByUserAvailableId(user: UserDto): QueueDto[] {
		const creatorQueues: QueueDto[] = this.getByUserCreatorId(user);
		const signedQueues: QueueDto[] = this.getByUserSignedId(user);

		return this.queues.filter(
			(queue) =>
				queue.group === user.group &&
				creatorQueues.findIndex((value) => queue.id === value.id) === -1 &&
				signedQueues.findIndex((value) => queue.id === value.id) === -1,
		);
	}

	public getByUserCreatorId(user: UserDto): QueueDto[] {
		return this.queues.filter((queue) => user.id == queue.creatorID);
	}

	public getByUserSignedId(user: UserDto): QueueDto[] {
		const requests: RequestDto[] = this.request.getByUserId(user.id);
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
		return this.queues.push(queue);
	}
}
