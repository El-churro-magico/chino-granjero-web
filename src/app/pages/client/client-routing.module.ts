import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  /*{
    path: 'home',
    component: ClientCom
  },
  {
    path: '',
    redirectTo: 'home'
  },
  {
    path: '**',
    redirectTo: 'home'
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
