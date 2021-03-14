import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../../../shared/interfaces/user.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  dataCorrect = true;
  constructor(private auth: AuthService,
              private route: Router)
  { }

  ngOnInit(): void {
  }

  login(user: User): void
  {
    this.auth.signIn(user).subscribe( (res) => {
      this.dataCorrect = res;
    });
  }
}
