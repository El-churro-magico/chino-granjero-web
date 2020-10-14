import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from '../pages/shared/login/login.component';
import { RegisterComponent } from '../pages/shared/register/register.component';

const routes: Routes = [
  {
    path: 'select-view',
    component: AuthComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'select-view'
  },
  {
    path: '**',
    redirectTo: 'select-view'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
