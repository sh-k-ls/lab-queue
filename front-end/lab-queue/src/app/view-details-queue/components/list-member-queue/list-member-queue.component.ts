import {Component, Input, OnInit} from '@angular/core';
import {ProfileDto} from '../../../../shared/front-back-end/profile.dto';

@Component({
  selector: 'app-list-member-queue',
  templateUrl: './list-member-queue.component.html',
  styleUrls: ['./list-member-queue.component.scss']
})

export class ListMemberQueueComponent implements OnInit {
  @Input()
  listMemberQueue: ProfileDto[] = [];

  @Input()
  id: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  Passed(): void {
  }
}
