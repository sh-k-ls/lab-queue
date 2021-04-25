import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDetailsQueueComponent } from './components/view-details-queue/view-details-queue.component';

const routes: Routes = [{ path: '', component: ViewDetailsQueueComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewDetailsQueueRoutingModule { }
