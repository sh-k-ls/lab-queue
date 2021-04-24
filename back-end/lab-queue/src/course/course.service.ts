import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEntity } from '../database.entities/course.entity';
import { GroupEntity } from '../database.entities/group.entity';
import { Course } from '../shared/front-back-end/course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  public findAll(): Promise<Course[]> {
    const courseEntities = this.courseRepository.find({
      relations: ['groups'],
    });
    return this.getStringsCourses(courseEntities);
  }

  private async getStringsCourses(
    courses: Promise<CourseEntity[]>,
  ): Promise<Course[]> {
    const groupsEntities = await courses;
    return groupsEntities.map((entity) => {
      const degreeParser = {
        Specialist: 'Специалисты',
        Bachelor: 'Бакалавры',
        Master: 'Магистры',
      };
      const numCourse = this.getCurNumCourse(entity.year);
      const courseName =
        entity.department +
        ' ' +
        degreeParser[entity.degree] +
        ' ' +
        numCourse +
        ' ' +
        'курс';

      return {
        course: courseName,
        groups: this.getStringsGroups(entity.groups),
      };
    });
  }

  private getStringsGroups(groups: GroupEntity[]): string[] {
    return groups.map((entity) => entity.groupName);
  }

  private getCurNumCourse(yearCourse: number): number {
    const today = new Date();
    let numCourse = today.getFullYear() - yearCourse + 1;
    if (today.getMonth() < 9) {
      numCourse -= 1;
    }
    return numCourse;
  }
}
