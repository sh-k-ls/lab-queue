import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {QueueDto} from '../../../../shared/front-back-end/queue.dto';
import {ProfileDto} from '../../../../shared/front-back-end/profile.dto';


@Component({
  selector: 'app-info-queue',
  templateUrl: './info-queue.component.html',
  styleUrls: ['./info-queue.component.scss']
})
export class InfoQueueComponent implements OnInit {

  @Input()
  id: number;

  @Input()
  queue: QueueDto;

  @Input()
  creator: ProfileDto;

  @Input()
  isCreator = false;

  @Output()
  public newItemEvent = new EventEmitter<boolean>();

  @Input()
  public isSigned = false;

  constructor() { }

  ngOnInit(): void {
  }

  emitSignedEvent(): void {
    this.newItemEvent.emit(this.isSigned);
  }

  toSignUp(): void {
    this.emitSignedEvent();
  }

  changeQueue(): void {
  }
}
