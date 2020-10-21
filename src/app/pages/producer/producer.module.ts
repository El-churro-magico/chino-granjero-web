import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ProducerRoutingModule } from './producer-routing.module';
//import { NewProductComponent } from './new-product/new-product.component';
import { ProducerComponent } from './producer.component';
//import { NewProductDetailsComponent } from './new-product-details/new-product-details.component';


@NgModule({
  declarations: [ProducerComponent], //NewProductComponent, NewProductDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProducerRoutingModule,
  ]
})
export class ProducerModule { }
