import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {QueueInterface} from '../../shared/interfaces/queue.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

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
    const url = '/api/v1/queue/' + idQueue;
    return this.http.get<QueueInterface>(url);
  }

  // PATCH /api/v1/queue/:id
  public editQueueById(idQueue: string, queue: QueueInterface): Observable<QueueInterface> {
    const url = '/api/v1/queue/' + idQueue;
    return this.http.patch<QueueInterface>(url, queue);
  }

  // POST /api/v1/queue/:id/signIn
  // TODO возможно тут userID не нужен, так как сервер сам должен найти ID по токену
  public signInQueue(idQueue: string, userId: string): Observable<QueueInterface> {
    const url = '/api/v1/queue/' + idQueue + '/signIn';
    return this.http.post<QueueInterface>(url, userId);
  }

  // PATCH /api/v1/queue/:id/signOut
  public sighOutQueue(idQueue: string, userId: string): Observable<QueueInterface> {
    const url = '/api/v1/queue/' + idQueue + '/signOut';
    return this.http.patch<QueueInterface>(url, userId);
  }
}
