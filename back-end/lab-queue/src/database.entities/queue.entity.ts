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

  @OneToMany(() => RequestEntity, (request) => request.queue)
  requests: Promise<RequestEntity[]>;

  @ManyToMany(() => GroupEntity)
  @JoinTable()
  groups: Promise<GroupEntity[]>;

  public parseGroup(
    groupIndex: number,
    groupDepartment: string,
    groupSemester: number,
    groupDegree: string,
  ): string {
    const degreeLiteral =
      groupDegree === 'Bachelor' ? 'Б' : groupDegree === 'Master' ? 'М' : '';
    return `${groupDepartment}-${groupSemester}${groupIndex}${degreeLiteral}`;
  }

  public async getDTO(): Promise<QueueDto> {
    const today = new Date();
    const allGroups = await Promise.resolve(this.groups);
    const year = allGroups[0].course.year;
    let numCourse = today.getFullYear() - year + 1;
    if (today.getMonth() < 9) {
      numCourse -= 1;
    }
    const currSemester =
      today.getMonth() < 9 && today.getMonth() > 1
        ? numCourse * 2
        : numCourse * 2 - 1;
    const groupsListStr: string[] = [];
    for (const groupEntity of allGroups) {
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
