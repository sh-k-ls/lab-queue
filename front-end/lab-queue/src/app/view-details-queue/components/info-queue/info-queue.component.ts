import {Component,  OnInit, Output, EventEmitter} from '@angular/core';
import {QueueInterface} from '../../../../shared/interfaces/queue.interface';


@Component({
  selector: 'app-info-queue',
  templateUrl: './info-queue.component.html',
  styleUrls: ['./info-queue.component.scss']
})
export class InfoQueueComponent implements OnInit {

  queue: QueueInterface = {name: 'имя очереди', description: 'очередь', nameTeacher: 'преподаватель'};

  @Output() newItemEvent = new EventEmitter<boolean>();

  isSigned: boolean;

  constructor() { }

  ngOnInit(): void {
    this.isSigned = false;
  }

  toSignUp(): void {
    if (this.isSigned) {
    }
    else {
    }
    this.isSigned = !this.isSigned;
    this.newItemEvent.emit(this.isSigned);
  }
}
