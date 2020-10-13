import { Component, Input, OnInit } from '@angular/core';

import { DisplayerData } from '../DisplayerData';
import { ReceiptData } from '../ReceiptData';

@Component({
  selector: 'receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  @Input() receiptData: ReceiptData;

  productsList: DisplayerData[];
  total: number = 0;

  constructor() { }

  ngOnInit(): void {
    console.log(this.receiptData);
    this.productsList = this.receiptData.products;
    this.calculateTotal();
  }

  calculateTotal() {
    let total = 0;
    for(let index = 0; index < this.productsList.length; index++) {
      let subtotal = this.productsList[index].quantity * this.productsList[index].unitPrice;
      total += subtotal;
    }
    this.total = total;
  }

}
