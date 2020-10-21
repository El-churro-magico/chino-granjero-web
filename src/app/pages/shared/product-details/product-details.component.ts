import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CardInterface } from '../CardInterface';
import { SelectorData } from '../SelectorData';
import { EventData } from '../EventData';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @Input() cardData: CardInterface;
  @Input() producerView: boolean;
  @Input() categories: SelectorData[];
  @Input() units: SelectorData[];
  @Output() raiseEvent = new EventEmitter<EventData>();

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
    if(this.cardData === undefined) {
      this.newProduct = true;
    }
    else {
      this.ID = this.cardData.productID;
      this.name = this.cardData.title;
      this.imageURL = this.cardData.imageURL;
      this.description = this.cardData.description;
      this.category = this.cardData.category;
      this.unit = this.cardData.unit;
      this.availability = this.cardData.availability;
    }
    console.log(this.newProduct);
  }

  onActionClicked(event: string) {
    this.raiseEvent.emit({
      eventID: event,
      attached: null
    });
  }

}
