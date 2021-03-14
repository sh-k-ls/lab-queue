import { Component, OnInit } from '@angular/core';
import {QueueInterface} from '../../../../shared/interfaces/queue.interface';


@Component({
  selector: 'app-info-queue',
  templateUrl: './info-queue.component.html',
  styleUrls: ['./info-queue.component.scss']
})
export class InfoQueueComponent implements OnInit {

  queue: QueueInterface = {name: 'имя очереди', description: 'очередь', nameTeacher: 'преподаватель'};
  constructor() { }

  ngOnInit(): void {
  }

}
