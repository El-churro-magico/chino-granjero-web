import { Component, OnInit } from '@angular/core';

import { ProductDetails } from '../pages/shared/ProductDetails';

import { ButtonInterface } from './shared/ButtonInterface';
import { CardInterface } from './shared/CardInterface';
import { SelectorData } from './shared/SelectorData'
import { ProfileData } from '../pages/shared/ProfileData';
import { ReceiptData } from './shared/ReceiptData';
import { DisplayerData } from './shared/DisplayerData';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  displayerData: DisplayerData[] = []

  receiptData: ReceiptData = {
    clientID: "Client ID",
    products: [],
    receiptID: "Receipt ID",
    deliveryAddress: "This is where the order must be delivered",
    total: 0,
    time: "10:25"
  }


  /*name: string = "Productor";

  buttons: ButtonInterface[] = [];
  cards: CardInterface[] = [];

  productDetails: ProductDetails = {
    productID: "Identificador producto",
    producerID: "Identificador Productor",
    name: "Producto 1",
    imageURL: "https://images2.alphacoders.com/963/thumb-1920-963413.png",
    description: "This is the description",
    category: "Empanadas",
    unit: "kilograms",
    availability: 200
  }

  categories: SelectorData[] = [
    {name: "Vegetales", identifier: 0},
    {name: "Frutas", identifier: 1},
    {name: "Lacteos", identifier: 2},
  ];

  units: SelectorData[] = [
    {name: "Unidad", identifier: 0},
    {name: "kilogramos", identifier: 1},
    {name: "Servicio", identifier: 2},
  ]

  profileData: ProfileData = {
    imageURL: 'https://ichef.bbci.co.uk/news/410/cpsprodpb/162E3/production/_103115809_robbierotten.jpg',
    role: "Producer",
    name: "Robbie",
    surnames: "Rotten",
    identificationCard: "Profile ID",
    province: "Heredia",
    canton: "Heredia",
    district: "Heredia",
    score: 4.5
  }
  */
  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 15; i++) {
      this.displayerData.push(    {
        productName: "Pan dulce",
        category: "Comida preparada",
        quantity: 6,
        unitPrice: 500
      });
    }
    this.receiptData.products = this.displayerData;
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

    /*
      CARDS

    for (let i = 0; i<5; i++){
      this.cards.push({
        newProduct: false,
        productID: "124234",
        producerID: "",
        orderID: "",
        imageURL: "https://c4.wallpaperflare.com/wallpaper/391/313/294/nier-automata-2b-nier-fireworks-wallpaper-preview.jpg",
        title: "This is the tittle",
        rating: 3.1,
        ETA: "15:00",
        description: "This is de description",
        category: "Cool category"
      });
    }
    this.cards.push({
      newProduct: true,
      productID: "",
      producerID: "",
      orderID: "124234",
      imageURL: "https://c4.wallpaperflare.com/wallpaper/391/313/294/nier-automata-2b-nier-fireworks-wallpaper-preview.jpg",
      title: "This is the tittle",
      rating: 3.1,
      ETA: "15:00",
      description: "This is de description",
      category: "Cool category"
    });*/


  }

}
