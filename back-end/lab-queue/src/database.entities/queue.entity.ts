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
import { QueueDto } from '../../../../shared/queue.dto';

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

  @OneToMany(() => RequestEntity, (request) => request.queue, {
    eager: true,
  })
  requests: RequestEntity[];

  @ManyToMany(() => GroupEntity, {
    eager: true,
  })
  @JoinTable()
  groups: GroupEntity[];

  public parseGroup(
    groupIndex: number,
    groupDepartment: string,
    groupSemester: number,
    groupDegree: string,
  ): string {
    const degreeLiteral =
      groupDegree === 'Bachelor' ? 'Б' : groupDegree === 'Master' ? 'М' : '';
    const group = `${groupDepartment}-${groupSemester}${groupIndex}${degreeLiteral}`;
    return group;
  }

  public getDTO(): QueueDto {
    const today = new Date();
    let numCourse = today.getFullYear() - this.groups[0].course.year + 1;
    if (today.getMonth() < 9) {
      numCourse -= 1;
    }
    const currSemester =
      today.getMonth() < 9 && today.getMonth() > 1
        ? numCourse * 2
        : numCourse * 2 - 1;
    const groupsListStr: string[] = [];
    for (const groupEntity of this.groups) {
      const groupName = this.parseGroup(
        groupEntity.number,
        groupEntity.course.department,
        currSemester,
        groupEntity.course.degree,
      );
      groupsListStr.push(groupName);
    }

    return {
      id: this.id,
      nameSubject: this.nameSubject,
      nameTeacher: this.nameTeacher,
      dateCreate: this.dateCreate,
      timeCreate: this.timeCreate,
      groups: groupsListStr,
      creatorId: this.creator.id,
      description: this.description,
    };
  }
}
