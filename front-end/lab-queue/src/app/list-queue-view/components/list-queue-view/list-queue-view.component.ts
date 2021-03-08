import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-queue-view',
  templateUrl: './list-queue-view.component.html',
  styleUrls: ['./list-queue-view.component.scss']
})
export class ListQueueViewComponent implements OnInit {

  public showList = [];
  private enableQueueList = ['Очередь 1'];
  private signQueueList = ['Очередь 2'];
  private authorQueueList = [];

  constructor() { }

  ngOnInit(): void {
    this.showList = this.enableQueueList;
  }

  addQueueBtnPush(): void {
    this.authorQueueList.push('Новая очередь');
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
