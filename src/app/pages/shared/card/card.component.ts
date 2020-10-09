import { Component, OnInit, Input } from '@angular/core';

import { CardInterface } from '../CardInterface';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardData: CardInterface;

  isProduct: boolean = false;
  isProducer: boolean = false;
  isOrder: boolean = false;
  newProduct: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(this.cardData.newProduct === true){
      this.newProduct = true;
    }
    else if(this.cardData.productID != "") {
      this.isProduct = true;
    } 
    else if(this.cardData.producerID != ""){
      this.isProducer = true;
    }
    else {
      this.isOrder = true;
    }

  }
}
