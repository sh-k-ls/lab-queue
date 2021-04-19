import { Injectable } from '@nestjs/common';
import { RequestDto } from '../shared/front-back-end/request.dto';
import { ProfileDto } from '../shared/front-back-end/profile.dto';
import { RequestService } from '../request/request.service';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../database.entities/profile.entity';
import { UserEntity } from '../database.entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    private readonly request: RequestService,
    private readonly user: UsersService,
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    private userRepository: Repository<UserEntity>,
  ) {}

  async getProfileByUserId(userId: number): Promise<ProfileDto[]> {
    const userEntities = await this.userRepository
      .find({ where: { id: userId } })
      .then();
    return userEntities.map((request) => request.getProfileDTO());
  }

  public async getProfilesByQueueId(queueId: string): Promise<ProfileDto[]> {
    const requests: RequestDto[] = await this.request.getByQueueId(queueId);
    const profiles: ProfileDto[] = [];
    for (const request of requests) {
      const promisedProfiles = this.getProfileByUserId(request.userId);
      const getProfiles = await Promise.resolve(promisedProfiles);
      for (const prof of getProfiles) {
        profiles.push(prof);
      }
    }
    // return null if profiles == [null]
    return profiles[0] ? profiles : null;
  }
}
