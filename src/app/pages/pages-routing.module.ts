import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'view',
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
