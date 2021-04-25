import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.auth.logout();
  }

}
