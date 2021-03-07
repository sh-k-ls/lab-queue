import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationBarComponent} from './components/navigation-bar/navigation-bar.component';
import {AngularMaterialModule} from '../angular-material/angular-material.module';



@NgModule({
  declarations: [
    NavigationBarComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    NavigationBarComponent
  ]
})
export class NavigationModule { }
