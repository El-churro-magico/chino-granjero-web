import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SharedModule } from './shared/shared.module'


@NgModule({
  declarations: [PagesComponent],
  imports: [
    PagesRoutingModule, SharedModule
  ]
})
export class PagesModule { }
