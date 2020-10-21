import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then(mod => mod.ClientModule)
  },
  {
    path: 'producer',
    loadChildren: () => import('./producer/producer.module').then(mod => mod.ProducerModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
  }
  /*{
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: ''
      },
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'view'
      }
    ]
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
