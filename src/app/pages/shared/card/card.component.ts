import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CardInterface } from '../CardInterface';
import { EventData } from '../EventData';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardData: CardInterface;
  @Output() raiseEvent = new EventEmitter<EventData>();

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

  onActionClicked(event: string) {
    if(this.isOrder === false) {
      this.raiseEvent.emit({
        eventID: event,
        attached: this.cardData
      });
    }
    else {
      this.raiseEvent.emit({
        eventID: event,
        attached: this.cardData.receiptData
      });
    }
  }
}
