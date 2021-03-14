import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMemberQueueComponent } from './list-member-queue.component';

describe('ListMemberQueueComponent', () => {
  let component: ListMemberQueueComponent;
  let fixture: ComponentFixture<ListMemberQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMemberQueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMemberQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
