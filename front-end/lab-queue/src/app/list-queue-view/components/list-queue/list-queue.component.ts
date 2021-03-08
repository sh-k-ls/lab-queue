import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-queue',
  templateUrl: './list-queue.component.html',
  styleUrls: ['./list-queue.component.scss']
})
export class ListQueueComponent implements OnInit {
  @Input()
  listQueue = [];

  @Input()
  enableToSignIn = true;

  constructor() { }

  ngOnInit(): void {
  }

}
