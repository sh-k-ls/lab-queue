import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {UserEntity} from './user.entity';
import {QueueEntity} from './queue.entity';


@Entity()
export class RequestEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: true})
    isActive: boolean;

    @ManyToOne(() => UserEntity, user => user.requests)
    user: UserEntity;

    @ManyToOne(() => QueueEntity, queue => queue.requests)
    queue: QueueEntity;
}

