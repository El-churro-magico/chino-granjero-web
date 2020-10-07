import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ViewSelectorComponent } from './view-selector/view-selector.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SelectorComponent } from './selector/selector.component';

@NgModule({
  declarations: [
    ViewSelectorComponent,
    LoginComponent,
    RegisterComponent,
    SelectorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    ViewSelectorComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class SharedModule { }
