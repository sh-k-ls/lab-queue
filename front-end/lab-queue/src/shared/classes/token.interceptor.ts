import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../../app/auth/services/auth.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService)
  {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.auth.getToken()
        }
      });
    }

    return next.handle(req);
  }
}
