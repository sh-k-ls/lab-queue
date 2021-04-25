import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../../app/auth/services/auth.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService)
  {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiUrl = req.url.startsWith('assets') ?
      req.url :
      `${environment.urlApiServer}${req.url}`;

    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.auth.getToken()
        },
        url: apiUrl
      });
    } else {
      req = req.clone({
        url: apiUrl
      });
    }

    console.log('req to server:\n' + req.url);

    return next.handle(req);
  }
}
