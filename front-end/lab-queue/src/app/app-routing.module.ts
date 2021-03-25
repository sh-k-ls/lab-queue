import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../shared/classes/auth.guard';


const routes: Routes = [
  {
    path: 'queue',
    loadChildren: () => import('./list-queue-view/list-queue-view.module').then(m => m.ListQueueViewModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    loadChildren: () => import('./create-queue/create-queue.module').then(m => m.CreateQueueModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'details/:idQueue',
    loadChildren: () => import('./view-details-queue/view-details-queue.module').then(m => m.ViewDetailsQueueModule),
    canActivate: [AuthGuard]
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
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
