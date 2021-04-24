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
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public getProfileDTO(userEntity: UserEntity): ProfileDto {
    const today = new Date();
    const currSemester =
      today.getMonth() < 9 && today.getMonth() > 1
        ? userEntity.group.course.year * 2
        : userEntity.group.course.year * 2 - 1;
    const degreeLiteral =
      userEntity.group.course.degree === 'Bachelor'
        ? 'Б'
        : userEntity.group.course.degree === 'Master'
        ? 'М'
        : '';
    let numCourse = today.getFullYear() - userEntity.group.course.year + 1;
    if (today.getMonth() < 9) {
      numCourse -= 1;
    }

    const courseName = `${userEntity.group.course.department} ${userEntity.group.course.degree} ${numCourse} курс`;
    return {
      id: userEntity.id,
      userId: userEntity.id,
      name: userEntity.profile.name,
      surname: userEntity.profile.surname,
      group: userEntity.group.groupName,
      course: courseName,
    };
  }

  async getProfileByUserId(userId: number): Promise<ProfileDto> {
    const userEntity = await this.userRepository
      .findOne({ where: { id: userId } })
      .then();
    return this.getProfileDTO(userEntity);
  }

  public async getProfilesByQueueId(queueId: string): Promise<ProfileDto[]> {
    const requests: RequestDto[] = await this.request.getByQueueId(queueId);
    const profiles: ProfileDto[] = [];
    for (const request of requests) {
      const promisedProfile = this.getProfileByUserId(request.userId);
      const getProfile = await Promise.resolve(promisedProfile);
      profiles.push(getProfile);
    }
    // return null if profiles == [null]
    return profiles[0] ? profiles : null;
  }
}
