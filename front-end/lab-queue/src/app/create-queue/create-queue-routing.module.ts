import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateQueueComponent } from './components/create-queue/create-queue.component';

const routes: Routes = [{ path: '', component: CreateQueueComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateQueueRoutingModule { }
