import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoQueueComponent } from './info-queue.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { ListQueueViewModule } from '../../../list-queue-view/list-queue-view.module';

describe('InfoQueueComponent', () => {
  let component: InfoQueueComponent;
  let fixture: ComponentFixture<InfoQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularMaterialModule,
        ListQueueViewModule
      ],
      declarations: [ InfoQueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoQueueComponent);
    component = fixture.componentInstance;
    component.queue = {
      id: 0,
      creatorId: 0,
      dateCreate: 'Test',
      nameTeacher: ['Test...'],
      nameSubject: 'Test...',
      description: 'Test...',
      timeCreate: 'Test...',
      groups: ['Test...'],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
