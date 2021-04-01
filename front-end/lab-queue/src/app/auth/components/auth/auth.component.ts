import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserDto} from '../../../../shared/front-back-end/user.dto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  dataCorrect = true;
  constructor(private auth: AuthService)
  { }

  ngOnInit(): void {
  }

  login(user: UserDto): void
  {
    this.auth.signIn(user).subscribe( (res) => {
      this.dataCorrect = res;
    });
  }
}
