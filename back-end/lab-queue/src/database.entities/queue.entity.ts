import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
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

  @ManyToOne(() => UserEntity, (user) => user.queues, {
    eager: true,
  })
  creator: UserEntity;

  @OneToMany(() => RequestEntity, (request) => request.queue, { cascade: true })
  requests: RequestEntity[];

  @ManyToMany(() => GroupEntity, { cascade: true })
  @JoinTable()
  groups: GroupEntity[];
}
