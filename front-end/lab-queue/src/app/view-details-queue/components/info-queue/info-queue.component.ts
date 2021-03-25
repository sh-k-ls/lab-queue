import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {QueueInterface} from '../../../../shared/interfaces/queue.interface';
import {RequestInterface} from '../../../../shared/interfaces/request.interface';
import {ApiService} from '../../../api-service/api.service';


@Component({
  selector: 'app-info-queue',
  templateUrl: './info-queue.component.html',
  styleUrls: ['./info-queue.component.scss']
})
export class InfoQueueComponent implements OnInit {

  queue: QueueInterface = {id: 1, name: 'имя очереди', description: 'очередь', nameTeacher: 'преподаватель'};

  @Input()
  id: number;

  @Output()
  public newItemEvent = new EventEmitter<boolean>();

  public isSigned = false;

  constructor(private readonly api: ApiService) { }

  ngOnInit(): void {
  }

  toSignUp(): void {
    if (this.isSigned) {
      this.api.changeQueueRequest(String(this.id), '1').subscribe();
    }
    else {
      const request: RequestInterface = {userId: 1, isSigned: true, queueId: this.id};
      this.api.createQueueRequests(String(this.id), request).subscribe();
    }
    this.isSigned = !this.isSigned;
    this.newItemEvent.emit(this.isSigned);
  }
}
