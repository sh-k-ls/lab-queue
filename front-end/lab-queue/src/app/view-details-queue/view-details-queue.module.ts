import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewDetailsQueueRoutingModule } from './view-details-queue-routing.module';
import { ViewDetailsQueueComponent } from './components/view-details-queue/view-details-queue.component';


@NgModule({
  declarations: [ViewDetailsQueueComponent],
  imports: [
    CommonModule,
    ViewDetailsQueueRoutingModule
  ]
})
export class ViewDetailsQueueModule { }
