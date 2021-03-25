import {Component, Input, OnInit} from '@angular/core';
import { QueueInterface } from '../../../../shared/interfaces/queue.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-queue',
  templateUrl: './list-queue.component.html',
  styleUrls: ['./list-queue.component.scss']
})
export class ListQueueComponent implements OnInit {
  @Input()
  listQueue: QueueInterface[] = [];

  @Input()
  enableToSignIn = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public openDetails(idQueue: number): void {
    this.router.navigate(['/details/' + idQueue]);
  }
}
