import { Injectable } from '@nestjs/common';
import { RequestDto } from '../shared/classes/request.dto';

@Injectable()
export class RequestService {
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

	public getByQueueId(queueId: number): RequestDto[] {
		return this.requests.filter((request) => request.queueId === queueId);
	}

	public getByUserId(userId: number): RequestDto[] {
		return this.requests.filter((request) => request.userId === userId);
	}

	public pushRequest(request: RequestDto): number {
		this.requests.push(request);
		console.log(this.requests);
		return 1;
	}

	public delRequest(request: RequestDto): number {
		const index = this.requests.indexOf(request, 0);
		if (index > -1) {
			this.requests.splice(index, 1);
		}
		return index;
	}
}
