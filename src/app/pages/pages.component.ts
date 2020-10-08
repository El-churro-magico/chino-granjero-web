import { Component, OnInit } from '@angular/core';

import { ButtonInterface } from './shared/ButtonInterface';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  name: string = "Productor";

  buttons: ButtonInterface[] = [];

  constructor() { }

  ngOnInit(): void {
    this.buttons.push({
      text: "Mis productos",
      icon: "../../assets/icons/store.svg"
    });
    this.buttons.push({
      text: "Mis productos",
      icon: "../../assets/icons/cart.svg"
    })
  }

}
