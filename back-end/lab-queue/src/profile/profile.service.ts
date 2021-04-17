import { Injectable } from '@nestjs/common';
import { RequestDto } from '../shared/front-back-end/request.dto';
import { ProfileDto } from '../shared/front-back-end/profile.dto';
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
    {
      name: 'Olga',
      surname: 'Ko',
      course: '4',
      userId: 2,
      group: 'IU7-85B',
      id: 2,
    },
  ];

  public getProfileByUserId(userId: number): ProfileDto {
    return this.profiles.find((profile) => profile.id === userId);
  }

  public async getProfilesByQueueId(queueId: string): Promise<ProfileDto[]> {
    const requests: RequestDto[] = await this.request.getByQueueId(queueId);
    const profiles: ProfileDto[] = [];
    for (const request of requests) {
      profiles.push(this.getProfileByUserId(request.userId));
    }
    // return null if profiles == [null]
    return profiles[0] ? profiles : null;
  }
}
