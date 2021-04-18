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
import { UserDto } from '../../../../shared/user.dto';
import { ProfileDto } from '../../../../shared/profile.dto';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => RequestEntity, (request) => request.user, {
    eager: true,
  })
  requests: RequestEntity[];

  @OneToMany(() => QueueEntity, (queue) => queue.creator, {
    eager: true,
  })
  queues: QueueEntity[];

  @OneToOne(() => ProfileEntity, {
    eager: true,
  })
  @JoinColumn()
  profile: ProfileEntity;

  @ManyToOne(() => GroupEntity, (group) => group.students, {
    eager: true,
  })
  group: GroupEntity;

  public getProfileDTO(): ProfileDto {
    const today = new Date();
    const currSemester =
      today.getMonth() < 9 && today.getMonth() > 1
        ? this.group.course.year * 2
        : this.group.course.year * 2 - 1;
    const degreeLiteral =
      this.group.course.degree === 'Bachelor'
        ? 'Б'
        : this.group.course.degree === 'Master'
        ? 'М'
        : '';
    let numCourse = today.getFullYear() - this.group.course.year + 1;
    if (today.getMonth() < 9) {
      numCourse -= 1;
    }
    const groupName = `${this.group.course.department}-${currSemester}${this.group.number}${degreeLiteral}`;
    const courseName = `${this.group.course.department} ${this.group.course.degree} ${numCourse} курс`;
    return {
      id: this.id,
      userId: this.id,
      name: this.profile.name,
      surname: this.profile.surname,
      group: groupName,
      course: courseName,
    };
  }
}
