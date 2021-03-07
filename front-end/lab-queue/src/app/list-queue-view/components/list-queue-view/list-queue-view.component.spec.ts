import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQueueViewComponent } from './list-queue-view.component';

describe('ListQueueView1Component', () => {
  let component: ListQueueViewComponent;
  let fixture: ComponentFixture<ListQueueViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListQueueViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQueueViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
