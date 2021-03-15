import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-create-queue',
  templateUrl: './create-queue.component.html',
  styleUrls: ['./create-queue.component.scss']
})

export class CreateQueueComponent implements OnInit {
  myControlCourse = new FormControl();
  myControlTeacher = new FormControl();

  courses: string[] = ['Технология командной разработки ПО', 'Цифровая обработка сигналов', 'Экология'];
  filteredCourses: Observable<string[]>;

  constructor() {}

  ngOnInit(): void {
    this.filteredCourses = this.myControlCourse.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.courses.filter(course => course.toLowerCase().includes(filterValue));
  }
}

