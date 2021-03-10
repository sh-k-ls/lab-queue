import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'queue',
    loadChildren: () => import('./list-queue-view/list-queue-view.module').then(m => m.ListQueueViewModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./create-queue/create-queue.module').then(m => m.CreateQueueModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./view-details-queue/view-details-queue.module').then(m => m.ViewDetailsQueueModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: 'queue'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
