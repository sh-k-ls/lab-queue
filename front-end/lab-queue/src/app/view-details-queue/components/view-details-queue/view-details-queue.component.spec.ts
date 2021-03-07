import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsQueueComponent } from './view-details-queue.component';

describe('ViewDetailsQueueComponent', () => {
  let component: ViewDetailsQueueComponent;
  let fixture: ComponentFixture<ViewDetailsQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
