import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QueueInterface } from '../../shared/interfaces/queue.interface';
import { User } from '../../shared/interfaces/user.interface';
import {RequestInterface} from '../../shared/interfaces/request.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public signIn(user: User): Observable<{token: string}> {
    return this.http.post<{ token: string }>(`/api/auth/login`, user);
  }

  // POST /api/v1/queue
  public createQueue(queue: QueueInterface): Observable<QueueInterface> {
    const url = '/api/v1/queue';
    return this.http.post<QueueInterface>(url, queue);
  }

  // GET /api/v1/queue/available
  public getQueueAvailable(): Observable<QueueInterface[]> {
    const url = '/api/v1/queue/available';
    return this.http.get<QueueInterface[]>(url);
  }

  // GET /api/v1/queue/signed
  public getQueueSigned(): Observable<QueueInterface[]> {
    const url = '/api/v1/queue/signed';
    return this.http.get<QueueInterface[]>(url);
  }

  // GET /api/v1/queue/creator
  public getQueueCreator(): Observable<QueueInterface[]> {
    const url = '/api/v1/queue/creator';
    return this.http.get<QueueInterface[]>(url);
  }

  // GET /api/v1/queue/:id
  public getQueueById(idQueue: string): Observable<QueueInterface> {
    const url = `/api/v1/queue/${idQueue}`;
    return this.http.get<QueueInterface>(url);
  }

  // GET /api/v1/queue/:id/request
  public getQueueRequests(idQueue: string): Observable<RequestInterface[]> {
    const url = `/api/v1/queue/${idQueue}/request`;
    return this.http.get<RequestInterface[]>(url);
  }

  // POST /api/v1/queue/:id/request
  // TODO описать на бэкенде
  public createQueueRequests(idQueue: string, request: RequestInterface): Observable<RequestInterface>{
    const url = `/api/v1/queue/${idQueue}/request`;
    return this.http.post<RequestInterface>(url, request);
  }

  // PATCH /api/v1/request/:id
  // TODO controller для request на бэке
  public changeQueueRequest(idRequest: string): Observable<RequestInterface>{
    const url = `/api/v1/request/${idRequest}`;
    return this.http.patch<RequestInterface>(url, {});
  }

  // PATCH /api/v1/queue/:id
  public editQueueById(idQueue: string, queue: QueueInterface): Observable<QueueInterface> {
    const url = `/api/v1/queue/${idQueue}`;
    return this.http.patch<QueueInterface>(url, queue);
  }

  // POST /api/v1/queue/:id/signIn
  public signInQueue(idQueue: string): Observable<QueueInterface> {
    const url = `/api/v1/queue/${idQueue}/signIn`;
    return this.http.post<QueueInterface>(url, {});
  }

  // PATCH /api/v1/queue/:id/signOut
  public sighOutQueue(idQueue: string): Observable<QueueInterface> {
    const url = `/api/v1/queue/${idQueue}/signOut`;
    return this.http.patch<QueueInterface>(url, {});
  }
}
