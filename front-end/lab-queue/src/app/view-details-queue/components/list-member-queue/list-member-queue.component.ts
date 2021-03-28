import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../api-service/api.service';
import {RequestInterface} from '../../../../shared/interfaces/request.interface';

@Component({
  selector: 'app-list-member-queue',
  templateUrl: './list-member-queue.component.html',
  styleUrls: ['./list-member-queue.component.scss']
})
export class ListMemberQueueComponent implements OnInit {
  @Input()
  listMemberQueue: RequestInterface[] = [];

  @Input()
  id: number;

  constructor(private readonly api: ApiService) {
  }

  ngOnInit(): void {
    this.api.getQueueById('1').subscribe(queue => console.log(queue));
    this.api.getQueueRequests(String(this.id)).subscribe(requests => this.listMemberQueue = requests);

  }

}
