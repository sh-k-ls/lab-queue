import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-view-details-queue',
  templateUrl: './view-details-queue.component.html',
  styleUrls: ['./view-details-queue.component.scss']
})
export class ViewDetailsQueueComponent implements OnInit {

  public memberList = [];
  constructor() { }

  ngOnInit(): void {
  }

}
