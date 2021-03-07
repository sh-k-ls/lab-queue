import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListQueueViewRoutingModule } from './list-queue-view-routing.module';
import { ListQueueViewComponent } from './components/list-queue-view/list-queue-view.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ListQueueComponent } from './components/list-queue/list-queue.component';


@NgModule({
  declarations: [
    ListQueueViewComponent,
    ListQueueComponent
  ],
  imports: [
    CommonModule,
    ListQueueViewRoutingModule,
    AngularMaterialModule
  ]
})
export class ListQueueViewModule { }
