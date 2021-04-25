import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQueueComponent } from './list-queue.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';

describe('ListQueueComponent', () => {
  let component: ListQueueComponent;
  let fixture: ComponentFixture<ListQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AngularMaterialModule
      ],
      declarations: [ ListQueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
