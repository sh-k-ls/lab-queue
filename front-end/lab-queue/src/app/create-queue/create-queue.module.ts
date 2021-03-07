import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateQueueRoutingModule } from './create-queue-routing.module';
import { CreateQueueComponent } from './components/create-queue/create-queue.component';


@NgModule({
  declarations: [CreateQueueComponent],
  imports: [
    CommonModule,
    CreateQueueRoutingModule
  ]
})
export class CreateQueueModule { }
