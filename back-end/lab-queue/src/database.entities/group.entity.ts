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

    @Column({ nullable: true })
    courseId: number;

    @Column()
    groupName: string;

    @OneToMany(() => UserEntity, user => user.group)
    students: UserEntity[];
}
