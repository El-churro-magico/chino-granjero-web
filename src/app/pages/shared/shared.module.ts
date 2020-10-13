import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ViewSelectorComponent } from './view-selector/view-selector.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SelectorComponent } from './selector/selector.component';
import { ScoreComponent } from './score/score.component';
import { HeaderComponent } from './header/header.component';
import { MainCardComponent } from './main-card/main-card.component';
import { CardComponent } from './card/card.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    ViewSelectorComponent,
    LoginComponent,
    RegisterComponent,
    SelectorComponent,
    ScoreComponent,
    HeaderComponent,
    MainCardComponent,
    CardComponent,
    ProductDetailsComponent,
    ProfileComponent
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
    MatToolbarModule,
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
    MatToolbarModule,
    ViewSelectorComponent,
    LoginComponent,
    RegisterComponent,
    ScoreComponent,
    HeaderComponent,
    MainCardComponent,
    CardComponent,
    ProductDetailsComponent,
    ProfileComponent
  ]
})
export class SharedModule { }
