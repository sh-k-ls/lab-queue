import {Component, Input, OnInit} from '@angular/core';
import {ProfileInterface} from '../../../../shared/interfaces/profile.interface';

@Component({
  selector: 'app-list-member-queue',
  templateUrl: './list-member-queue.component.html',
  styleUrls: ['./list-member-queue.component.scss']
})

export class ListMemberQueueComponent implements OnInit {
  @Input()
  listMemberQueue: ProfileInterface[] = [];

  @Input()
  id: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  Passed(): void {
  }
}
