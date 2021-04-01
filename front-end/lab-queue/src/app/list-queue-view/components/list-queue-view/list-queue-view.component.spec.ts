import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQueueViewComponent } from './list-queue-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';

describe('ListQueueView1Component', () => {
  let component: ListQueueViewComponent;
  let fixture: ComponentFixture<ListQueueViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AngularMaterialModule
      ],
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
