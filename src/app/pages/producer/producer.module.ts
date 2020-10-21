import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ProducerRoutingModule } from './producer-routing.module';
import { ProducerComponent } from './producer.component';


@NgModule({
  declarations: [ ProducerComponent ], 
  imports: [
    CommonModule,
    SharedModule,
    ProducerRoutingModule,
  ]
})
export class ProducerModule { }
