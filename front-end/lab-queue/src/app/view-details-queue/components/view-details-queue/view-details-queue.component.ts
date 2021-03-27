import {Component,  OnInit} from '@angular/core';
import {ApiService} from '../../../api-service/api.service';
import {  ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {RequestInterface} from '../../../../shared/interfaces/request.interface';
import {QueueInterface} from '../../../../shared/interfaces/queue.interface';

@Component({
  selector: 'app-view-details-queue',
  templateUrl: './view-details-queue.component.html',
  styleUrls: ['./view-details-queue.component.scss']
})

export class ViewDetailsQueueComponent implements OnInit {

  public memberList: RequestInterface[] = [];
  id: number;
  queue: QueueInterface;
  constructor(private readonly api: ApiService,
              private route: ActivatedRoute, ) { }


  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('idQueue'))
    )
      .subscribe(data => this.id = +data);
    this.api.getQueueById(String(this.id)).subscribe(queue => this.queue = queue);
  }

  toSignup($event: boolean): void {

    console.log($event);
  }
}
