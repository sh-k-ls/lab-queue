import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {QueueDto} from '../../../../shared/front-back-end/queue.dto';
import {RequestDto} from '../../../../shared/front-back-end/request.dto';
import {ApiService} from '../../../api-service/api.service';
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

  constructor(private readonly api: ApiService) { }

  ngOnInit(): void {
  }

  toSignUp(): void {
    if (this.isSigned) {
      this.api.deleteQueueRequest(String(this.id)).subscribe();
    }
    else {
      const request: RequestDto = {userId: 1, isSigned: true, queueId: this.id};
      this.api.createQueueRequests(String(this.id), request).subscribe();
    }
    this.isSigned = !this.isSigned;
    this.newItemEvent.emit(this.isSigned);
  }

  changeQueue(): void {
  }
}
