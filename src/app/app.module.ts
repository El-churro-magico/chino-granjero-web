import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AdminService} from './pages/admin/admin.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
