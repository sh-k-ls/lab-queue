import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  // GET /api/v1/queue
  public getQueue(): Observable<QueueInterface[]> {
    const url = '/api/v1/queue';
    return this.http.get<QueueInterface[]>(url);
  }

  // GET /api/v1/queue/:id
  public getQueueById(idQueue: string): Observable<QueueInterface> {
    const url = `/api/v1/queue/${idQueue}`;
    return this.http.get<QueueInterface>(url);
  }

  // GET /api/v1/queue/:id/request
  public getQueueRequests(idQueue: string): Observable<RequestInterface[]>{
    const url = `/api/v1/queue/${idQueue}/request`;
    return this.http.get<RequestInterface[]>(url);
  }

  // POST /api/v1/queue/:id/request
  public createQueueRequests(idQueue: string, request: RequestInterface): Observable<RequestInterface>{
    const url = `/api/v1/queue/${idQueue}/request`;
    return this.http.post<RequestInterface>(url, request);
  }


  // PATCH /api/v1/request/:id
  public changeQueueRequest(idRequest: string, userId: string): Observable<RequestInterface>{
    const url = '/api/v1/request/${idRequest}';
    const params = new HttpParams()
      .set('userId', userId);

    return this.http.patch<RequestInterface>(url, {params});
  }

  // PATCH /api/v1/queue/:id
  public editQueueById(idQueue: string, queue: QueueInterface): Observable<QueueInterface> {
    const url = `/api/v1/queue/${idQueue}`;
    return this.http.patch<QueueInterface>(url, queue);
  }

  // POST /api/v1/queue/:id/signIn
  // TODO возможно тут userID не нужен, так как сервер сам должен найти ID по токену
  public signInQueue(idQueue: string, userId: string): Observable<QueueInterface> {
    const url = `/api/v1/queue/${idQueue}/signIn`;
    const params = new HttpParams()
      .set('userId', userId);

    return this.http.post<QueueInterface>(url, {params});
  }

  // PATCH /api/v1/queue/:id/signOut
  public sighOutQueue(idQueue: string, userId: string): Observable<QueueInterface> {
    const url = `/api/v1/queue/${idQueue}/signOut`;
    const params = new HttpParams()
      .set('userId', userId);

    return this.http.patch<QueueInterface>(url, {params});
  }
}
