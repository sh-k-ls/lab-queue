import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'lab-queue';

  constructor(private auth: AuthService)
  { }

  ngOnInit(): void {
    const potentialToken = localStorage.getItem(environment.localStorageToken);
    if (potentialToken !== null) {
      this.auth.setToken(potentialToken);
    }
  }

}
