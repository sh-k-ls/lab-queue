import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQueueComponent } from './create-queue.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateQueueComponent', () => {
  let component: CreateQueueComponent;
  let fixture: ComponentFixture<CreateQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AngularMaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [ CreateQueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
