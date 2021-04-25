import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../../../../../shared/user.dto';
import { QueueDto } from '../../../../../shared/queue.dto';
import { RequestDto } from '../../../../../shared/request.dto';
import { ProfileDto } from '../../../../../shared/profile.dto';
import { Course } from '../../shared/front-back-end/course.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public signIn(user: UserDto): Observable<{ token: string }> {
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

  // GET /api/v1/user/:id/profile
  public getProfileByUserId(idUser: string): Observable<ProfileDto> {
    const url = `/api/v1/user/${idUser}/profile`;
    return this.http.get<ProfileDto>(url);
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

  // GET /api/v1/queue/groups
  // public getAllGroups(): Observable<string[]> {
  //   const url = `/api/v1/queue/groups`;
  //   return this.http.get<string[]>(url);
  // }

  // GET /api/v1/queue/courses
  public getAllCourses(): Observable<Course[]> {
    const url = `/api/v1/queue/courses`;
    return this.http.get<Course[]>(url);
  }

  // GET /api/v1/queue/teachers
  public getAllTeachers(): Observable<string[]> {
    const url = `/api/v1/queue/teachers`;
    return this.http.get<string[]>(url);
  }

  // GET /api/v1/queue/subjects
  public getAllSubjects(): Observable<string[]> {
    const url = `/api/v1/queue/subjects`;
    return this.http.get<string[]>(url);
  }

  // POST /api/v1/queue/:id/request
  // TODO описать на бэкенде
  public createQueueRequests(
    idQueue: string,
    request: RequestDto
  ): Observable<RequestDto> {
    const url = `/api/v1/queue/${idQueue}/request`;
    return this.http.post<RequestDto>(url, request);
  }

  // PATCH /api/v1/queue/:id/request
  // TODO controller для request на бэке
  public deleteQueueRequest(idQueue: string): Observable<RequestDto> {
    const url = `/api/v1/queue/${idQueue}/request`;
    return this.http.patch<RequestDto>(url, {});
  }

  // PUT /api/v1/queue/:id
  public editQueueById(queue: QueueDto): Observable<QueueDto> {
    const url = `/api/v1/queue`;
    return this.http.put<QueueDto>(url, queue);
  }

  // POST /api/v1/queue/:id/signIn
  public signInQueue(idQueue: string): Observable<QueueDto> {
    const url = `/api/v1/queue/${idQueue}/signIn`;
    return this.http.post<QueueDto>(url, {});
  }

  // PATCH /api/v1/queue/:idQueue/request/:idUser
  public setPassed(idQueue: string, idUser: string): Observable<RequestDto> {
    const url = `/api/v1/queue/${idQueue}/request/${idUser}`;
    return this.http.patch<RequestDto>(url, {});
  }

  // PATCH /api/v1/queue/:id/signOut
  public sighOutQueue(idQueue: string): Observable<QueueDto> {
    const url = `/api/v1/queue/${idQueue}/signOut`;
    return this.http.patch<QueueDto>(url, {});
  }

  // DELETE /api/v1/queue/:idQueue/delete
  public deleteQueue(idQueue: string): Observable<any> {
    const url = `/api/v1/queue/${idQueue}/delete`;
    return this.http.delete(url);
  }
}
