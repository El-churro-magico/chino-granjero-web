import { Component, Input, OnInit, OnChanges} from '@angular/core';

import {AdminService} from '../admin.service';

@Component({
  selector:'admin-field',
  templateUrl:'field.component.html',
  styleUrls:['field.component.scss']
})

export class AdminFieldComponent implements OnInit, OnChanges{
  @Input() title:string;
  @Input() type:string;
  @Input() cards:any;

  constructor(
    private adminService: AdminService
  ){
  }

  ngOnInit(){
    //this.cards = JSON.parse(this.cards);
  }

  ngOnChanges(){
    this.cards = JSON.parse(this.cards);
  }

  cardToString(card){
    return JSON.stringify(card);
  }
}
