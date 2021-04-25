import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewDetailsQueueRoutingModule } from './view-details-queue-routing.module';
import { ViewDetailsQueueComponent } from './components/view-details-queue/view-details-queue.component';
import { InfoQueueComponent } from './components/info-queue/info-queue.component';
import { ListMemberQueueComponent } from './components/list-member-queue/list-member-queue.component';
import {AngularMaterialModule} from '../angular-material/angular-material.module';



@NgModule({
  declarations: [ViewDetailsQueueComponent,
    InfoQueueComponent,
    ListMemberQueueComponent],
  imports: [
    CommonModule,
    ViewDetailsQueueRoutingModule,
    AngularMaterialModule
  ]
})
export class ViewDetailsQueueModule { }
