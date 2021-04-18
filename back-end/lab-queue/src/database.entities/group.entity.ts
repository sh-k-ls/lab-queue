import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CourseEntity } from './course.entity';

@Entity()
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @ManyToOne(() => CourseEntity, (course) => course.groups, {
    eager: true,
  })
  course: CourseEntity;

  @OneToMany(() => UserEntity, (user) => user.group, {
    eager: true,
  })
  students: UserEntity[];
}
