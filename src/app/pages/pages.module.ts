import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AdminService} from './admin/admin.service'

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SharedModule } from './shared/shared.module';
import { AdminFieldComponent } from './admin/field/field.component';
import { AdminPage } from './admin/admin.page';
import {FieldCardComponent} from './admin/field/field-card/field-card.component';


@NgModule({
  declarations: [
    PagesComponent,
    AdminFieldComponent,
    AdminPage,
    FieldCardComponent
  ],
  imports: [
    PagesRoutingModule,
    SharedModule,
    NgbModule
  ],
  providers:[
    AdminService
  ]
})
export class PagesModule { }
