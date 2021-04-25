import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../shared/front-back-end/user.dto';
import { UserEntity } from '../database.entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  public getDTO(userEntity: UserEntity): UserDto {
    if (userEntity) {
      return {
        group: userEntity.group.groupName,
        id: userEntity.id,
        username: userEntity.username,
        password: userEntity.password,
      };
    } else {
      return {
        group: 'Error',
        id: -1,
        username: 'Error',
        password: 'Error',
      };
    }
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<UserDto> {
    const user = await this.usersRepository.findOne({
      where: { username: username },
    });
    return this.getDTO(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
