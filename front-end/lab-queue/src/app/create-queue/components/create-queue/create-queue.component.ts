import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-create-queue',
  templateUrl: './create-queue.component.html',
  styleUrls: ['./create-queue.component.scss']
})

export class CreateQueueComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  myControlCourse = new FormControl();
  myControlTeacher = new FormControl();

  courses: string[] = ['Технология командной разработки ПО', 'Цифровая обработка сигналов', 'Экология'];
  filteredCourses: Observable<string[]>;

  filteredTeachers: Observable<string[]>;
  teachers: string[] = [];
  allTeachers: string[] = ['Иванов И.И.', 'Петров П.П.', 'Сидоров С.С.'];

  @ViewChild('teacherInput') teacherInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredTeachers = this.myControlTeacher.valueChanges.pipe(
      startWith(null),
      map((teacher: string | null) => teacher ? this._filter1(teacher) : this.allTeachers.slice()));
  }

  ngOnInit(): void {
    this.filteredCourses = this.myControlCourse.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  add(event: MatChipInputEvent): void {
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

  remove(fruit: string): void {
    const index = this.teachers.indexOf(fruit);

    if (index >= 0) {
      this.teachers.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.teachers.push(event.option.viewValue);
    this.teacherInput.nativeElement.value = '';
    this.myControlTeacher.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.courses.filter(course => course.toLowerCase().includes(filterValue));
  }

  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTeachers.filter(teacher => teacher.toLowerCase().indexOf(filterValue) === 0);
  }
}
