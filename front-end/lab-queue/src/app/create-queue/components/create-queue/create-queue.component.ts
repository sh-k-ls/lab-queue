import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from '../../../api-service/api.service';
import { QueueDto } from '../../../../shared/front-back-end/queue.dto';
import { Course } from '../../../../shared/front-back-end/course.dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-queue',
  templateUrl: './create-queue.component.html',
  styleUrls: ['./create-queue.component.scss'],
})
export class CreateQueueComponent implements OnInit {
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  myControlCourse = new FormControl();
  myControlTeacher = new FormControl();
  myControlParticipant = new FormControl();

  courseListStr: string[] = [];
  groupListStr: string[] = [];
  courses: Course[] = [];

  subjects: string[] = [];
  filteredCourses: Observable<string[]>;

  filteredTeachers: Observable<string[]>;
  teachers: string[] = [];
  allTeachers: string[] = [];

  filteredParticipants: Observable<string[]>;
  participants: string[] = [];
  allParticipants: string[] = [];

  @ViewChild('nameSubject') nameSubject: ElementRef<HTMLInputElement>;
  @ViewChild('dateInput') dateInput: ElementRef<HTMLInputElement>;
  @ViewChild('timeInput') timeInput: ElementRef<HTMLInputElement>;
  @ViewChild('teacherInput') teacherInput: ElementRef<HTMLInputElement>;
  @ViewChild('participantInput') participantInput: ElementRef<HTMLInputElement>;
  @ViewChild('descriptionInput') descriptionInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  minDate = new Date();
  maxDate = new Date(
    this.minDate.getFullYear(),
    this.minDate.getMonth() + 1,
    31
  );

  idQueueEdit?: number;
  queue?: QueueDto;

  constructor(
    private readonly api: ApiService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.api.getAllCourses().subscribe((courses) => {
      this.courses = courses;
      this.courseListStr = courses.map((courseDto) => courseDto.course);
      this.groupListStr =
        (courses.map((courseDto) => courseDto.groups))
        .reduce((accumulator, curVal) => [...accumulator, ...curVal]);
    });

    this.api.getAllTeachers().subscribe((teachers) => {
      this.allTeachers = teachers;
      this.filteredTeachers = this.myControlTeacher.valueChanges.pipe(
        startWith(''),
        map((teacher: string | null) =>
          teacher ? this._filterTeachers(teacher) : this.allTeachers.slice()
        )
      );
    });

    this.api.getAllSubjects().subscribe((subjects) => {
      this.subjects = subjects;
      this.filteredCourses = this.myControlCourse.valueChanges.pipe(
        startWith(''),
        map((value) => this._filterSubjects(value))
      );
    });

    this.updateParticipants();

    this.route.paramMap
      .pipe(switchMap((params) => params.getAll('idQueue')))
      .subscribe((idQueue) => {
        this.idQueueEdit = +idQueue;
        this.api.getQueueById(String(this.idQueueEdit)).subscribe((queue) => {
          this.queue = queue;
          this.nameSubject.nativeElement.value = this.queue.nameSubject;
          this.teachers = this.queue.nameTeacher;
          this.participants = this.queue.groups;
          this.dateInput.nativeElement.value = this.queue.dateCreate;
          this.timeInput.nativeElement.value = this.queue.timeCreate;
          this.descriptionInput.nativeElement.value = this.queue.description;
        });
      });
  }

  private updateParticipants(): void {
    this.filteredParticipants = this.myControlParticipant.valueChanges.pipe(
      startWith(''),
      map((participant: string | null) =>
        participant
          ? this._filterParticipants(participant)
          : this.allParticipants.slice()
      )
    );
  }

  dateFilter = (date: { getDay: () => number }) => {
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

    this.teacherInput.nativeElement.blur();
  }

  selectedParticipant(event: MatAutocompleteSelectedEvent): void {
    this.participants.push(event.option.viewValue);
    this.participantInput.nativeElement.value = '';
    this.myControlParticipant.setValue(null);

    this.participantInput.nativeElement.blur();
  }

  private _filterSubjects(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.subjects.filter((course) =>
      course.toLowerCase().includes(filterValue)
    );
  }

  private _filterTeachers(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTeachers.filter(
      (teacher) => teacher.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private _filterParticipants(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allParticipants.filter(
      (participant) => participant.toLowerCase().indexOf(filterValue) === 0
    );
  }

  public chooseParticipants(participantType: string): void {
    if (participantType === 'course') {
      this.allParticipants = this.courseListStr;
      this.updateParticipants();
    } else {
      this.allParticipants = this.groupListStr;
      this.updateParticipants();
    }
  }

  public addQueueBtnPush(participantType: string, queue: QueueDto): void {
    const groups = queue.groups.map(group => {
      const course = this.courses.find((courseObj) => courseObj.course === group);
      if (course) {
        return course.groups;
      } else {
        return [group];
      }
    }).reduce((accumulator, curVal) => [...accumulator, ...curVal]);
    queue.groups = groups;

    if (!this.idQueueEdit) {
      console.log(queue);
      this.api.createQueue(queue).subscribe( () =>
        this.router.navigate(['/queue'])
      );
    } else {
      queue.id = this.queue.id;
      queue.creatorId = this.queue.creatorId;
      this.api.editQueueById(queue).subscribe((res) =>
        this.router.navigate(['/details/' + this.idQueueEdit])
      );
    }
    // TODO сообщение об успешной отправке
  }
}
