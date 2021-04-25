import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api-service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { QueueDto } from '../../../../shared/front-back-end/queue.dto';
import { ProfileDto } from '../../../../shared/front-back-end/profile.dto';
import { AuthService } from '../../../auth/services/auth.service';
import { RequestDto } from '../../../../shared/front-back-end/request.dto';

@Component({
  selector: 'app-view-details-queue',
  templateUrl: './view-details-queue.component.html',
  styleUrls: ['./view-details-queue.component.scss'],
})
export class ViewDetailsQueueComponent implements OnInit {
  public memberList: ProfileDto[] = [];
  id: number;
  isSigned = false;
  isCreator = false;
  creator: ProfileDto = {
    id: 0,
    userId: 0,
    name: 'Загрузка',
    surname: 'Загрузка',
    group: 'Загрузка',
    course: 'Загрузка',
  };
  queue: QueueDto = {
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
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap((params) => params.getAll('idQueue')))
      .subscribe((idQueue) => (this.id = +idQueue));
    this.api.getQueueById(String(this.id)).subscribe((queue) => {
      this.queue = queue;
      this.isCreator = this.auth.getUserId() === this.queue.creatorId;
      this.api
        .getProfileByUserId(String(this.queue.creatorId))
        .subscribe((profile) => {
          this.creator = profile;
        });
    });
    this.updateMembers();
  }

  checkSigned(userId: number): void {
    if (this.memberList) {
      this.isSigned = !!this.memberList.find(
        (member) => member.userId === userId
      );
    } else {
      this.isSigned = false;
    }
  }

  updateMembers(): void {
    this.api.getQueueRequestsProfiles(String(this.id)).subscribe((requests) => {
      this.memberList = requests;
      const userId = this.auth.getUserId();
      this.checkSigned(userId);
    });
  }

  toSignup(): void {
    if (this.isSigned) {
      this.api
        .deleteQueueRequest(String(this.id))
        .subscribe(() => this.updateMembers());
    } else {
      const request: RequestDto = {
        userId: 1,
        isSigned: true,
        queueId: this.id,
      };
      this.api
        .createQueueRequests(String(this.id), request)
        .subscribe(() => this.updateMembers());
    }
    this.isSigned = !this.isSigned;
  }

  toPass(userId: number): void {
    this.api.setPassed(String(this.queue.id), String(userId)).subscribe(
      () => this.updateMembers()
    );
  }

  toEditQueue(): void {
    this.router.navigate(['/edit/', this.queue.id]);
  }
}
