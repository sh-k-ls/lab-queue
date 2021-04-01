import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsQueueComponent } from './view-details-queue.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';

describe('ViewDetailsQueueComponent', () => {
  let component: ViewDetailsQueueComponent;
  let fixture: ComponentFixture<ViewDetailsQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AngularMaterialModule
      ],
      declarations: [ ViewDetailsQueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailsQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
