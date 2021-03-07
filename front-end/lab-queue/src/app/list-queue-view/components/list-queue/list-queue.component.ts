import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-queue',
  templateUrl: './list-queue.component.html',
  styleUrls: ['./list-queue.component.scss']
})
export class ListQueueComponent implements OnInit {
  cards = ['123'];

  constructor() { }

  ngOnInit(): void {
  }

}
