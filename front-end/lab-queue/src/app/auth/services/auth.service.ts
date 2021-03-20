import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../../../shared/interfaces/user.interface';
import {Observable, of} from 'rxjs';
import {catchError, mapTo, tap} from 'rxjs/operators';
import { ApiService } from '../../api-service/api.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;

  constructor(
    private http: HttpClient,
    public router: Router,
    private api: ApiService
  ) { }

  signIn(user: User): Observable<boolean> {
    return this.api.signIn(user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem(environment.localStorageToken, token);
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
    const token = localStorage.getItem(environment.localStorageToken);
    return !!token;
  }

  logout(): void {
    this.setToken(null);
    const removeToken = localStorage.removeItem(environment.localStorageToken);
    if (removeToken == null) {
      this.router.navigate(['/auth']);
    }
  }
}
