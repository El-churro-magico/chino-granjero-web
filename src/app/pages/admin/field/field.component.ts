import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector:'admin-field',
  templateUrl:'field.component.html',
  styleUrls:['field.component.scss']
})

export class AdminFieldComponent implements OnInit{
  @Input() title:string;
  @Input() type:string;
  @Input() cards:any;

  constructor(){
  }

  ngOnInit(){
    this.cards = JSON.parse(this.cards);
    this.cards.toString = function (){return JSON.stringify(this)};
  }

  cardToString(card){
    return JSON.stringify(card);
  }
}
