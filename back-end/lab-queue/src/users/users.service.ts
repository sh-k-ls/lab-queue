import { Injectable } from '@nestjs/common';
import { UserDto } from '../shared/classes/user.dto';

@Injectable()
export class UsersService {
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

	async findOne(username: string): Promise<UserDto | undefined> {
		return this.users.find((user) => user.username === username);
	}
}
