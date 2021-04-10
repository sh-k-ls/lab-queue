import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { RequestEntity } from './request.entity';
import { GroupEntity } from './group.entity';

@Entity()
export class QueueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameSubject: string;

  @Column('simple-array')
  nameTeacher: string[];

  @Column({ type: 'date' })
  dateCreate: string;

  @Column({ type: 'time' })
  timeCreate: string;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.queues)
  creator: UserEntity;

  @OneToMany(() => RequestEntity, (request) => request.queue)
  requests: RequestEntity[];

  @ManyToMany(() => GroupEntity)
  @JoinTable()
  groups: GroupEntity[];
}
