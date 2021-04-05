import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api-service/api.service';
import { QueueDto } from '../../../../shared/front-back-end/queue.dto';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-list-queue-view',
  templateUrl: './list-queue-view.component.html',
  styleUrls: ['./list-queue-view.component.scss']
})
export class ListQueueViewComponent implements OnInit {
  public showList: QueueDto[] = [];
  private availableQueueList: QueueDto[] = [];
  private signQueueList: QueueDto[] = [];
  private creatorQueueList: QueueDto[] = [];

  constructor(private api: ApiService,
              private readonly router: Router)
  { }

  ngOnInit(): void {
    forkJoin({
      availableQueues: this.api.getQueueAvailable(),
      signedQueues: this.api.getQueueSigned(),
      creatorQueues: this.api.getQueueCreator()})
      .subscribe(({availableQueues, signedQueues, creatorQueues}) => {
        this.availableQueueList = availableQueues;
        this.signQueueList = signedQueues;
        this.creatorQueueList = creatorQueues;
        this.showList = this.availableQueueList;
      });
  }

  addQueueBtnPush(): void {
    this.router.navigate(['/create']);
  }

  typeQueueChange(value: string): void {
    switch (value) {
      case 'enabledQueue':
        this.showList = this.availableQueueList;
        break;
      case 'signQueue':
        this.showList = this.signQueueList;
        break;
      case 'authorQueue':
        this.showList = this.creatorQueueList;
        break;
      default:
        console.log('Error in choosing queue');
    }
  }

}
