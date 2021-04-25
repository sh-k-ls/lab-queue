import {Component, Input, OnInit} from '@angular/core';
import { QueueDto } from '../../../../shared/front-back-end/queue.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-queue',
  templateUrl: './list-queue.component.html',
  styleUrls: ['./list-queue.component.scss']
})
export class ListQueueComponent implements OnInit {
  @Input()
  listQueue: QueueDto[] = [];

  @Input()
  enableToSignIn = true;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  public openDetails(idQueue: number): void {
    this.router.navigate(['/details/', idQueue]);
  }
}
