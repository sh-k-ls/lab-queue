import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoQueueComponent } from './info-queue.component';

describe('InfoQueueComponent', () => {
  let component: InfoQueueComponent;
  let fixture: ComponentFixture<InfoQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoQueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
