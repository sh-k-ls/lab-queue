import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { QueueEntity } from './queue.entity';
import { RequestDto } from '../shared/front-back-end/request.dto';

@Entity()
export class RequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => UserEntity, (user) => user.requests, {
    eager: true,
  })
  user: UserEntity;

  @ManyToOne(() => QueueEntity, (queue) => queue.requests, {
    eager: true,
  })
  queue: QueueEntity;
}
