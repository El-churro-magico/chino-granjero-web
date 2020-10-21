import { Component, OnInit } from '@angular/core';

import { ButtonInterface } from '../shared/ButtonInterface';
import { CardInterface } from '../shared/CardInterface';
import { DisplayerData } from '../shared/DisplayerData';
import { LogInInterface } from '../shared/LogInInterface';
import { OrderInterface } from '../shared/OrderInterface';
import { ProductDetails } from '../shared/ProductDetails';
import { ProfileData } from '../shared/ProfileData';
import { ReceiptData } from '../shared/ReceiptData';
import { SelectorData } from '../shared/SelectorData';
import { EventData } from '../shared/EventData';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.scss']
})
export class ProducerComponent implements OnInit {
  // Show booleans
  showSmokeScreenBool: boolean = false;
  showProfileBool: boolean = false;
  showProductDetailsBool: boolean = false;
  showReceiptDetailsBool: boolean = false;
  showNewProductBool: boolean = false;

  // Header buttons
  buttonHeaderFirst: ButtonInterface = {text: "Mis productos", icon: '../../../assets/icons/store.svg'};
  buttonHeaderSecond: ButtonInterface = {text: "Pedidos", icon: '../../../assets/icons/receipt.svg'};
  headerButtons: ButtonInterface[] = [this.buttonHeaderFirst, this.buttonHeaderSecond];

  // Profile data
  profileData: ProfileData = {
    imageURL: 'https://ichef.bbci.co.uk/news/410/cpsprodpb/162E3/production/_103115809_robbierotten.jpg',
    role: "Producer",
    name: "Robbie",
    surnames: "Rotten",
    identificationCard: "Profile ID",
    province: "Heredia",
    canton: "Santa Barbara",
    district: "Canton de santa barbara",
    score: 4.5
  }

  // Cards to be displayed
  products: CardInterface[] = [];
  receipts: CardInterface[] = [];
  displayedCards: CardInterface[] = this.products;

  // Product details
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
  currentProductDetails: ProductDetails = null;

  categories: SelectorData[] = [
    {name: "Vegetales", identifier: 0},
    {name: "Frutas", identifier: 1},
    {name: "Lacteos", identifier: 2},
  ];

  units: SelectorData[] = [
    {name: "Unidad", identifier: 0},
    {name: "kilogramos", identifier: 1},
    {name: "Servicio", identifier: 2},
  ];

  // Receipt details
  currentReceiptDetails: ReceiptData = null;

  // Receipt products
  receiptProducts: DisplayerData[] = [{
      productName: 'Producto generico',
      category: 'Categoria de productos genericos',
      quantity: 25,
      unitPrice: 7500
    },
    {
      productName: 'Producto generico',
      category: 'Categoria de productos genericos',
      quantity: 25,
      unitPrice: 7500
    },
    {
      productName: 'Producto generico',
      category: 'Categoria de productos genericos',
      quantity: 25,
      unitPrice: 7500
    }
  ]

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i<7; i++) {
      this.products.push({
        newProduct: false,
        productID: "124234",
        producerID: "",
        orderID: "",
        imageURL: "https://c4.wallpaperflare.com/wallpaper/391/313/294/nier-automata-2b-nier-fireworks-wallpaper-preview.jpg",
        title: "This is the tittle",
        rating: 3.1,
        ETA: "15:00",
        description: "This is de description",
        category: "Cool category",
        unit: 'kilograms',
        availability: 80,
        receiptData: null
      });
    }
    this.products.push({
      newProduct: true,
      productID: "",
      producerID: "",
      orderID: "124234",
      imageURL: "https://c4.wallpaperflare.com/wallpaper/391/313/294/nier-automata-2b-nier-fireworks-wallpaper-preview.jpg",
      title: "This is the tittle",
      rating: 3.1,
      ETA: "15:00",
      description: "This is de description",
      category: "Cool category",
      unit: 'kilograms',
      availability: 80,
      receiptData: null
    });
    for (let i = 0; i<3; i++) {
      this.receipts.push({
        newProduct: false,
        productID: "",
        producerID: "",
        orderID: "",
        imageURL: "https://c4.wallpaperflare.com/wallpaper/391/313/294/nier-automata-2b-nier-fireworks-wallpaper-preview.jpg",
        title: "",
        rating: 0,
        ETA: "",
        description: "",
        category: "",
        unit: '',
        availability: 0,
        receiptData: {
          clientID: "Client ID",
          products: this.receiptProducts,
          receiptID: "Receipt ID",
          deliveryAddress: "This is where the order must be delivered",
          total: 0,
          time: "10:25"
        }
      })
    }
  }  

  clickEvent($event: EventData) {
    console.log($event.eventID);
    console.log($event.attached);
    switch ($event.eventID) {
      // Header Events
      case 'headerProfile': {
        this.showProfile();
        break;
      }
      case 'headerButtonFirst': {
        this.showProducts();
        break;
      }
      case 'headerButtonSecond': {
        this.showReceipts();
        break;
      }
      // Profile Events

      // Card Events
      case 'newProduct': {
        this.newProduct();
        break;
      }
      case 'productDetails': {
        this.showProductDetails($event);
        break;
      }
      /*case 'producerDetails': {
        break;
      }*/
      case 'receipt': {
        this.showReceiptDetails($event);
        break;
      }
      case 'hidePopUp': {
        this.hidePopUp();
      }
    }
  }

  showProfile() {
    this.showSmokeScreenBool = true;
    this.showProfileBool = true;
  }

  showProducts() {
    this.displayedCards = this.products;
  }

  showReceipts() {
    this.displayedCards = this.receipts;
  }

  newProduct() {
    this.showSmokeScreenBool = true;
    this.currentProductDetails = undefined;
    this.showProductDetailsBool = true;
  }

  showProductDetails(event: EventData) {
    this.showSmokeScreenBool = true;
    this.currentProductDetails = event.attached;
    this.showProductDetailsBool = true;
  }

  showReceiptDetails(event: EventData) {
    this.showSmokeScreenBool = true;
    console.log(event.attached);
    this.currentReceiptDetails = event.attached;
    this.showReceiptDetailsBool = true;
  }

  hidePopUp() {
    this.showSmokeScreenBool = false;
    this.showProfileBool = false;
    this.showProductDetailsBool = false;
    this.showReceiptDetailsBool = false;
    this.showNewProductBool = false;
  }

}
