import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../shared/front-back-end/user.dto';
import { UserEntity } from '../database.entities/user.entity';
import { ProfileDto } from '../shared/front-back-end/profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  public getDTO(userEntity: UserEntity): UserDto {
    return {
      group: userEntity.group.groupName,
      id: userEntity.id,
      username: userEntity.username,
      password: userEntity.password,
    };
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<UserDto> {
    return this.getDTO(
      await this.usersRepository.findOne({ where: { username: username } }),
    );
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
