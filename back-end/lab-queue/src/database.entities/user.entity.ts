import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { RequestEntity } from './request.entity';
import { QueueEntity } from './queue.entity';
import { GroupEntity } from './group.entity';
import { UserDto } from '../../../../shared/user.dto';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => RequestEntity, (request) => request.user)
  requests: RequestEntity[];

  @OneToMany(() => QueueEntity, (queue) => queue.creator)
  queues: QueueEntity[];

  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profile: ProfileEntity;

  @ManyToOne(() => GroupEntity, (group) => group.students)
  group: GroupEntity;

  public getDTO(): UserDto {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
      group: String(this.group.id),
    };
  }
}
