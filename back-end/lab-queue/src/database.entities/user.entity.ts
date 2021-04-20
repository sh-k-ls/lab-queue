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
import { ProfileDto } from '../shared/front-back-end/profile.dto';
import { UserDto } from '../shared/front-back-end/user.dto';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => RequestEntity, (request) => request.user)
  requests: Promise<RequestEntity[]>;

  @OneToMany(() => QueueEntity, (queue) => queue.creator)
  queues: Promise<QueueEntity[]>;

  @OneToOne(() => ProfileEntity, {
    eager: true,
  })
  @JoinColumn()
  profile: ProfileEntity;

  @ManyToOne(() => GroupEntity, (group) => group.students, {
    eager: true,
  })
  group: GroupEntity;
}
