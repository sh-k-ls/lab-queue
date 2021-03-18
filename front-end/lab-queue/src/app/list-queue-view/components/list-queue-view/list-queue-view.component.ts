import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api-service/api.service';
import { QueueInterface } from '../../../../shared/interfaces/queue.interface';

@Component({
  selector: 'app-list-queue-view',
  templateUrl: './list-queue-view.component.html',
  styleUrls: ['./list-queue-view.component.scss']
})
export class ListQueueViewComponent implements OnInit {

  public showList: QueueInterface[] = [];
  private enableQueueList: QueueInterface[] = [];
  private signQueueList: QueueInterface[] = [];
  private authorQueueList: QueueInterface[] = [];

  constructor(private api: ApiService) { }

  async ngOnInit(): Promise<void> {
    await this.updateList().then(list => this.enableQueueList = list);
    this.showList = this.enableQueueList;
  }

  async updateList(): Promise<QueueInterface[]> {
    return this.api.getQueue().toPromise();
  }

  async addQueueBtnPush(): Promise<void> {
    this.api.createQueue({name: 'новая очередь', description: 'описание', nameTeacher: 'Тассов'}).subscribe();
    await this.updateList().then(list => this.enableQueueList = list);
    this.showList = this.enableQueueList;
  }

  typeQueueChange(value): void {
    switch (value) {
      case 'enabledQueue':
        this.showList = this.enableQueueList;
        break;
      case 'signQueue':
        this.showList = this.signQueueList;
        break;
      case 'authorQueue':
        this.showList = this.authorQueueList;
        break;
      default:
        console.log('Error in choosing queue');
    }
  }

}
