import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { GroupEntity } from './group.entity';
import { Course } from '../shared/front-back-end/course.dto';

export type DegreeType = 'Master' | 'Bachelor' | 'Specialist';

@Entity()
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  department: string;

  @Column({
    type: 'enum',
    enum: ['Master', 'Bachelor', 'Specialist'],
    default: 'Bachelor',
  })
  degree: DegreeType;

  @Column()
  year: number;

  @OneToMany(() => GroupEntity, (group) => group.course)
  groups: GroupEntity[];
}
