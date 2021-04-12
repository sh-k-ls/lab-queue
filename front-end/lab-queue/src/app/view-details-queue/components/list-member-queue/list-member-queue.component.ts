import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileDto} from '../../../../shared/front-back-end/profile.dto';

@Component({
  selector: 'app-list-member-queue',
  templateUrl: './list-member-queue.component.html',
  styleUrls: ['./list-member-queue.component.scss']
})

export class ListMemberQueueComponent implements OnInit {
  @Input()
  listMemberQueue: ProfileDto[] = [];

  @Input()
  id: number;

  @Input()
  isSigned: boolean;

  @Output()
  public newItemEvent = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  Passed(event: Event): void {
    const button = event.target as Element;
    this.newItemEvent.emit(+(button.id));
  }
}
