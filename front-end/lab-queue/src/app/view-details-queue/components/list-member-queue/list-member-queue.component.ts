import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-member-queue',
  templateUrl: './list-member-queue.component.html',
  styleUrls: ['./list-member-queue.component.scss']
})
export class ListMemberQueueComponent implements OnInit {
  @Input()
  listMemberQueue: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
