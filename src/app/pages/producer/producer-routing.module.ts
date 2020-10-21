import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProducerComponent } from './producer.component';

const routes: Routes = [
  {
    path: 'home',
    component: ProducerComponent
  },
  {
    path: '',
    redirectTo: 'home'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProducerRoutingModule { }
