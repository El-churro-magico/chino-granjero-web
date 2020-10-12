import { Component, OnInit, Input } from '@angular/core';

import { ProductDetails } from '../ProductDetails'
import { SelectorData } from '../selectorData';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @Input() productDetails: ProductDetails;
  @Input() producerView: boolean;
  @Input() categories: SelectorData[];
  @Input() units: SelectorData[];

  newProduct: boolean = false;

  ID: string = "";
  producerID = "";
  name: string = "Nombre del Producto";
  imageURL: string = "";
  description: string = "Descripción del producto";
  category: string = "";
  unit: string = "";
  availability: number = 0;

  // For client view
  quantity: number = 1;

  constructor() { }

  ngOnInit(): void {
    if(this.productDetails === undefined) {
      this.newProduct = true;
    }
    else {
      this.ID = this.productDetails.productID;
      this.name = this.productDetails.name;
      this.imageURL = this.productDetails.imageURL;
      this.description = this.productDetails.description;
      this.category = this.productDetails.category;
      this.unit = this.productDetails.unit;
      this.availability = this.productDetails.availability;
    }
    console.log(this.newProduct);
  }

}
