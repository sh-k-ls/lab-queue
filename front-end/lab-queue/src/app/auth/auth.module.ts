import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class AuthModule { }
