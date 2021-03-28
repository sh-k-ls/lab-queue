import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api-service/api.service';
import { QueueInterface } from '../../../../shared/interfaces/queue.interface';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-list-queue-view',
  templateUrl: './list-queue-view.component.html',
  styleUrls: ['./list-queue-view.component.scss']
})
export class ListQueueViewComponent implements OnInit {
  public showList: QueueInterface[] = [];
  private availableQueueList: QueueInterface[] = [];
  private signQueueList: QueueInterface[] = [];
  private creatorQueueList: QueueInterface[] = [];

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

  typeQueueChange(value): void {
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
