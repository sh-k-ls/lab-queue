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
  isSigned = false;

  queue: QueueInterface = {
    id: 0,
    creatorId: 0,
    dateCreate: 'Загрузка...',
    nameTeacher: ['Загрузка...'],
    nameSubject: 'Загрузка...',
    description: 'Загрузка...',
    timeCreate: 'Загрузка...',
    groups: ['Загрузка...'],
  };

  constructor(
    private readonly api: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('idQueue'))
    )
      .subscribe(idQueue => this.id = +idQueue);
    this.api.getQueueById(String(this.id)).subscribe(queue => {
      this.queue = queue;
    });
    this.updateMembers();
  }

  public updateMembers(): void {
    this.api.getQueueRequestsProfiles(String(this.id)).subscribe(requests => {
      this.memberList = requests;
    });
  }

  toSignup(): void {
    this.updateMembers();
  }
}
