import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../../../shared/interfaces/user.interface';
import {Observable, of} from 'rxjs';
import {catchError, mapTo, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  res: any;
  private token: string;

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  signIn(user: User): Observable<boolean> {
    return this.http.post<{token: string}>(`/api/auth/login`, user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('access-token', token);
            this.setToken(token);
            this.router.navigate(['/queue']);
          }
        ),
        mapTo(true),
        catchError(error => of(false)),
      );
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access-token');
    return !!token;
  }

  logout(): void {
    this.setToken(null);
    const removeToken = localStorage.removeItem('access-token');
    if (removeToken == null) {
      this.router.navigate(['/auth']);
    }
  }
}
