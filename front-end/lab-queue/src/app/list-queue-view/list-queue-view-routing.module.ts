import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListQueueViewComponent } from './components/list-queue-view/list-queue-view.component';

const routes: Routes = [{ path: '', component: ListQueueViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListQueueViewRoutingModule { }
