import { Component, OnInit } from '@angular/core';
import { race } from 'rxjs';

import { ButtonInterface } from './shared/ButtonInterface';
import { CardInterface } from './shared/CardInterface';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  name: string = "Productor";

  buttons: ButtonInterface[] = [];
  cards: CardInterface[] = [];

  constructor() { }

  ngOnInit(): void {
    /*
      BUTTONS

    this.buttons.push({
      text: "Mis productos",
      icon: "../../assets/icons/store.svg"
    });
    this.buttons.push({
      text: "Mis productos",
      icon: "../../assets/icons/cart.svg"
    })*/
    for (let i = 0; i<5; i++){
      this.cards.push({
        newProduct: false,
        productID: "",
        producerID: "",
        orderID: "124234",
        imageURL: "https://c4.wallpaperflare.com/wallpaper/391/313/294/nier-automata-2b-nier-fireworks-wallpaper-preview.jpg",
        title: "This is the tittle",
        rating: 3.1,
        ETA: "15:00",
        description: "This is de description",
        category: "Cool category"
      });
      console.log(this.cards);
    }  
  }

}
