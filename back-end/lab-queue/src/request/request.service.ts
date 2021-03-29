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
		return this.requests.filter((request) => request.queueId === queueId && request.isSigned === true);
	}

	public getByUserId(userId: number): RequestDto[] {
		return this.requests.filter((request) => request.userId === userId);
	}

	public pushRequest(request: RequestDto): number {
		return this.requests.push(request);
	}

	public changeSigned(userId: number, queueId: number): RequestDto{
		let resRequest: RequestDto;
		for(const request of this.requests) {
			if(request.userId === userId && request.queueId === queueId && request.isSigned === true) {
				request.isSigned = !(request.isSigned);
				resRequest = request;
			}
		}
		return resRequest;
	}

	public delRequest(request: RequestDto): number {
		const index = this.requests.indexOf(request, 0);
		if (index > -1) {
			this.requests.splice(index, 1);
		}
		return index;
	}
}
