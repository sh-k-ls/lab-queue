import {Component,  OnInit} from '@angular/core';
import {ApiService} from '../../../api-service/api.service';
import {  ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {QueueInterface} from '../../../../shared/interfaces/queue.interface';
import {ProfileInterface} from '../../../../shared/interfaces/profile.interface';

@Component({
  selector: 'app-view-details-queue',
  templateUrl: './view-details-queue.component.html',
  styleUrls: ['./view-details-queue.component.scss']
})

export class ViewDetailsQueueComponent implements OnInit {

  public memberList: ProfileInterface[] = [];
  id: number;

  queue: QueueInterface = {
    id: 0,
    creatorName: 'Загрузка...',
    dateCreate: 'Загрузка...',
    nameTeacher: 'Загрузка...',
    name: 'Загрузка...',
    description: 'Загрузка...',
  };

  constructor(private readonly api: ApiService,
              private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('idQueue'))
    )
      .subscribe(data => this.id = +data);
    this.api.getQueueById(String(this.id)).subscribe(queue => this.queue = queue);
    this.updateMembers();
  }

  public updateMembers(): void{
    this.api.getQueueRequestsProfiles(String(this.id)).subscribe(requests => this.memberList = requests);
  }

  toSignup(): void {
    this.updateMembers();
  }
}
