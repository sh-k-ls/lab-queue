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
    {
      id: 3,
      username: 'johny',
      password: 'changehim',
      group: 'iu7',
    },
  ];

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<UserDto> {
    return (
      await this.usersRepository.findOne({ where: { username: username } })
    ).getDTO();
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
