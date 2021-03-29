import { Injectable } from '@nestjs/common';
import { RequestDto } from '../shared/classes/request.dto';
import { ProfileDto } from '../shared/classes/profile.dto';
import { RequestService } from '../request/request.service';

@Injectable()
export class ProfileService {
	constructor(private readonly request: RequestService) {}
	private profiles: ProfileDto[] = [
		{
			name: 'Kolya',
			surname: 'Ko',
			course: '4',
			userId: 1,
			group: 'IU7-85B',
			id: 1,
		},
	];

	public getProfileByUserId(userId: number) {
		return this.profiles.find((profile) => profile.id === userId);
	}

	public getProfilesByQueueId(queueId: number) {
		const requests: RequestDto[] = this.request.getByQueueId(queueId);
		const profiles: ProfileDto[] = [];
		for (const request of requests) {
			profiles.push(this.getProfileByUserId(request.userId));
		}
		return profiles;
	}
}
