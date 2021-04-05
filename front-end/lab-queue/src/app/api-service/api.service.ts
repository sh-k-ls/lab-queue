import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserDto} from '../../../../../shared/user.dto';
import {QueueDto} from '../../../../../shared/queue.dto';
import {RequestDto} from '../../../../../shared/request.dto';
import {ProfileDto} from '../../../../../shared/profile.dto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public signIn(user: UserDto): Observable<{token: string}> {
    return this.http.post<{ token: string }>(`/api/auth/login`, user);
  }

  // POST /api/v1/queue
  public createQueue(queue: QueueDto): Observable<QueueDto> {
    const url = '/api/v1/queue';
    return this.http.post<QueueDto>(url, queue);
  }

  // GET /api/v1/profile
  public getProfile(): Observable<UserDto> {
    const url = '/api/v1/profile';
    return this.http.get<UserDto>(url);
  }

  // GET /api/v1/queue/available
  public getQueueAvailable(): Observable<QueueDto[]> {
    const url = '/api/v1/queue/available';
    return this.http.get<QueueDto[]>(url);
  }

  // GET /api/v1/queue/signed
  public getQueueSigned(): Observable<QueueDto[]> {
    const url = '/api/v1/queue/signed';
    return this.http.get<QueueDto[]>(url);
  }

  // GET /api/v1/queue/creator
  public getQueueCreator(): Observable<QueueDto[]> {
    const url = '/api/v1/queue/creator';
    return this.http.get<QueueDto[]>(url);
  }

  // GET /api/v1/queue/:id
  public getQueueById(idQueue: string): Observable<QueueDto> {
    const url = `/api/v1/queue/${idQueue}`;
    return this.http.get<QueueDto>(url);
  }

  // GET /api/v1/queue/:id/request
  public getQueueRequests(idQueue: string): Observable<RequestDto[]> {
    const url = `/api/v1/queue/${idQueue}/request`;
    return this.http.get<RequestDto[]>(url);
  }

  // GET /api/v1/queue/:id/request/profile
  // TODO описать на бэкенде
  public getQueueRequestsProfiles(idQueue: string): Observable<ProfileDto[]> {
    const url = `/api/v1/queue/${idQueue}/request/profile`;
    return this.http.get<ProfileDto[]>(url);
  }

  // POST /api/v1/queue/:id/request
  // TODO описать на бэкенде
  public createQueueRequests(idQueue: string, request: RequestDto): Observable<RequestDto>{
    const url = `/api/v1/queue/${idQueue}/request`;
    return this.http.post<RequestDto>(url, request);
  }

  // PATCH /api/v1/queue/:id/request
  // TODO controller для request на бэке
  public deleteQueueRequest(idQueue: string): Observable<RequestDto>{
    const url = `/api/v1/queue/${idQueue}/request`;
    return this.http.patch<RequestDto>(url, {});
  }

  // PATCH /api/v1/queue/:id
  public editQueueById(idQueue: string, queue: QueueDto): Observable<QueueDto> {
    const url = `/api/v1/queue/${idQueue}`;
    return this.http.patch<QueueDto>(url, queue);
  }

  // POST /api/v1/queue/:id/signIn
  public signInQueue(idQueue: string): Observable<QueueDto> {
    const url = `/api/v1/queue/${idQueue}/signIn`;
    return this.http.post<QueueDto>(url, {});
  }

  // PATCH /api/v1/queue/:id/signOut
  public sighOutQueue(idQueue: string): Observable<QueueDto> {
    const url = `/api/v1/queue/${idQueue}/signOut`;
    return this.http.patch<QueueDto>(url, {});
  }
}
