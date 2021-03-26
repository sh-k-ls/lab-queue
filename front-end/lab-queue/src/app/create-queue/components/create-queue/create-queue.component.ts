import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {ApiService} from '../../../api-service/api.service';
import {QueueInterface} from '../../../../shared/interfaces/queue.interface';
import {Course} from '../../../../shared/interfaces/course.interface';
import {isWebpackFiveOrHigher} from '@angular-devkit/build-angular/src/utils/webpack-version';

@Component({
  selector: 'app-create-queue',
  templateUrl: './create-queue.component.html',
  styleUrls: ['./create-queue.component.scss']
})

export class CreateQueueComponent implements OnInit {

  constructor(
    private readonly api: ApiService,
  ) {
    this.filteredTeachers = this.myControlTeacher.valueChanges.pipe(
      startWith(null),
      map((teacher: string | null) => teacher ? this._filterTeachers(teacher) : this.allTeachers.slice()));
    this.filteredParticipants = this.myControlParticipant.valueChanges.pipe(
      startWith(null),
      map((participant: string | null) => participant ? this._filterParticipants(participant) : this.allParticipants.slice()));
  }
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  myControlCourse = new FormControl();
  myControlTeacher = new FormControl();
  myControlParticipant = new FormControl();
  courseList: Course[] = [
    {
      department: 'ИУ7',
      degree: 'Bachelor',
      year: 2017,
      groups: 6,
    },
    {
      department: 'ИУ6',
      degree: 'Master',
      year: 2020,
      groups: 5,
    },
    {
      department: 'ИУ8',
      degree: 'Specialist',
      year: 2016,
      groups: 3,
    }
  ];
  courseListStr: string[] = [];
  groupListStr: string[] = [];
  subjects: string[] = ['Технология командной разработки ПО', 'Цифровая обработка сигналов', 'Экология'];
  filteredCourses: Observable<string[]>;

  filteredTeachers: Observable<string[]>;
  teachers: string[] = [];
  allTeachers: string[] = ['Иванов И.И.', 'Петров П.П.', 'Сидоров С.С.'];

  filteredParticipants: Observable<string[]>;
  participants: string[] = [];
  allParticipants: string[] = [];

  @ViewChild('teacherInput') teacherInput: ElementRef<HTMLInputElement>;
  @ViewChild('participantInput') participantInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  minDate = new Date();
  maxDate = new Date(this.minDate.getFullYear(), this.minDate.getMonth() + 1, this.minDate.getMonth());

  ngOnInit(): void {
    this.filteredCourses = this.myControlCourse.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterSubjects(value))
      );

    this.parserCourse(this.courseList);
  }

  public parserCourse(courses: Course[]): void {
    const today = new Date();
    for (const course of courses) {
      let numCourse = today.getFullYear() - course.year + 1;
      if (today.getMonth() < 9) {
        numCourse -= 1;
      }

      const degree = course.degree === 'Bachelor' ? 'Бакалавры'
        : (course.degree === 'Master' ? 'Магистры' : 'Специалисты');
      this.courseListStr.push(`${course.department} ${degree} ${numCourse} курс`);
      const currSemester = (today.getMonth() < 9 && today.getMonth() > 1) ? numCourse * 2 : numCourse * 2 - 1;
      for (let i = 1; i <= course.groups; i++) {
        const groupName = this.parseGroup(i, course.department, currSemester, course.degree);
        this.groupListStr.push(groupName);
      }
    }
  }

  public parseGroup(groupIndex: number, groupDepartment: string, groupSemester: number, groupDegree: string): string {
    const degreeLiteral = groupDegree === 'Bachelor' ? 'Б'
      : (groupDegree === 'Master' ? 'М' : '');
    const group = `${groupDepartment}-${groupSemester}${groupIndex}${degreeLiteral}`;
    return group;
  }

  dateFilter = (date) => {
    const day = date.getDay();
    return day !== 0;
  }

  addTeacher(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.teachers.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.myControlTeacher.setValue(null);
  }

  addParticipant(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.participants.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.myControlParticipant.setValue(null);
  }

  removeTeacher(teacher: string): void {
    const index = this.teachers.indexOf(teacher);

    if (index >= 0) {
      this.teachers.splice(index, 1);
    }
  }

  removeParticipant(participant: string): void {
    const index = this.participants.indexOf(participant);

    if (index >= 0) {
      this.participants.splice(index, 1);
    }
  }

  selectedTeacher(event: MatAutocompleteSelectedEvent): void {
    this.teachers.push(event.option.viewValue);
    this.teacherInput.nativeElement.value = '';
    this.myControlTeacher.setValue(null);
  }

  selectedParticipant(event: MatAutocompleteSelectedEvent): void {
    this.participants.push(event.option.viewValue);
    this.participantInput.nativeElement.value = '';
    this.myControlParticipant.setValue(null);
  }

  private _filterSubjects(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.subjects.filter(course => course.toLowerCase().includes(filterValue));
  }

  private _filterTeachers(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTeachers.filter(teacher => teacher.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterParticipants(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allParticipants.filter(participant => participant.toLowerCase().indexOf(filterValue) === 0);
  }

  public chooseParticipants(participantType: string): void {
    if (participantType === 'course') {
      this.allParticipants = this.courseListStr;
    } else {
      this.allParticipants = this.groupListStr;
    }
  }
}
