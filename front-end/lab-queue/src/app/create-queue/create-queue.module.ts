import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateQueueRoutingModule } from './create-queue-routing.module';
import { CreateQueueComponent } from './components/create-queue/create-queue.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [CreateQueueComponent],
  imports: [
    CommonModule,
    CreateQueueRoutingModule,
    AngularMaterialModule
  ]
})
export class CreateQueueModule { }
