import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserDto} from '../../../shared/front-back-end/user.dto';
import {Observable, of} from 'rxjs';
import {catchError, mapTo, tap} from 'rxjs/operators';
import { ApiService } from '../../api-service/api.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private userId: number;

  constructor(
    private http: HttpClient,
    public router: Router,
    private api: ApiService
  ) { }

  signIn(user: UserDto): Observable<boolean> {
    return this.api.signIn(user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem(environment.localStorageToken, token);
            this.setToken(token);
            this.router.navigate(['/queue']);

            this.addUserInfoToLocalStorage();
          }
        ),
        mapTo(true),
        catchError(_ => of(false)),
      );
  }

  private addUserInfoToLocalStorage(): void {
    this.api.getProfile().subscribe(
      user => {
        localStorage.setItem(environment.localStorageUser, user.id.toString());
        this.setUserId(user.id);
      });
  }

  getUserId(): number {
    return this.userId;
  }

  setUserId(userId: number): void {
    this.userId = userId;
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(environment.localStorageToken);
    return !!token;
  }

  logout(): void {
    this.setToken(null);
    const removeToken = localStorage.removeItem(environment.localStorageToken);
    const removeUser = localStorage.removeItem(environment.localStorageUser);
    if (removeToken == null && removeUser == null) {
      this.router.navigate(['/auth']);
    }
  }
}
