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

  private readonly users: UserDto[] = [
    {
      id: 1,
      username: 'john',
      password: 'changeme',
      group: 'iu7',
    },
    {
      id: 2,
      username: 'maria',
      password: 'guess',
      group: 'iu7',
    },
  ];

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<UserEntity> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
