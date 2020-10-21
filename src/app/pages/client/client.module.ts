import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';


@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    SharedModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
