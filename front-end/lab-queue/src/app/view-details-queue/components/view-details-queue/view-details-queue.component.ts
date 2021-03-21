import {Component,  OnInit} from '@angular/core';

@Component({
  selector: 'app-view-details-queue',
  templateUrl: './view-details-queue.component.html',
  styleUrls: ['./view-details-queue.component.scss']
})

export class ViewDetailsQueueComponent implements OnInit {

  public memberList: string[] = [];

  constructor() { }


  ngOnInit(): void {
  }

  toSignup($event: boolean): void {
    if ($event) {
      this.memberList.push('hi');
    }
    else {
      this.memberList.pop();
    }
    console.log($event);
  }
}
