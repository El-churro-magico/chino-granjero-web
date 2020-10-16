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
    path: 'login-client',
    component: LoginComponent,
    data: {view: 'Cliente'}
  },
  {
    path: 'login-producer',
    component: LoginComponent,
    data: {view: 'Productor'}
  },
  {
    path: 'login-administrator',
    component: LoginComponent,
    data: {view: 'Administrador'}
  },
  {
    path: 'register-client',
    component: RegisterComponent,
    data: {view: 'Cliente'}
  },
  {
    path: 'register-producer',
    component: RegisterComponent,
    data: {view: 'Productor'}
  },
  {
    path: 'register-admin',
    component: RegisterComponent,
    data: {view: 'Administrador'}
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
