import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProducerRoutingModule } from './producer-routing.module';
import { NewProductComponent } from './new-product/new-product.component';
import { ProducerComponent } from './producer.component';
import { NewProductDetailsComponent } from './new-product-details/new-product-details.component';


@NgModule({
  declarations: [NewProductComponent, ProducerComponent, NewProductDetailsComponent],
  imports: [
    CommonModule,
    ProducerRoutingModule
  ]
})
export class ProducerModule { }
