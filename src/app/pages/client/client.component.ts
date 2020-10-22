import { Component, OnInit } from '@angular/core';

import { CommunicationService } from '../shared/services/communication.service';

import { ButtonInterface } from '../shared/ButtonInterface';
import { CardInterface } from '../shared/CardInterface';
import { DisplayerData } from '../shared/DisplayerData';
import { ProductDetails } from '../shared/ProductDetails';
import { ProfileData } from '../shared/ProfileData';
import { ReceiptData } from '../shared/ReceiptData';
import { SelectorData } from '../shared/SelectorData';
import { EventData } from '../shared/EventData';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  // Show booleans
  showSmokeScreenBool: boolean = false;
  showProfileBool: boolean = false;
  showProductDetailsBool: boolean = false;
  showReceiptDetailsBool: boolean = false;

  // Header buttons
  buttonHeaderFirst: ButtonInterface = {text: "Ubicacion", icon: '../../../assets/icons/location.svg'};
  buttonHeaderSecond: ButtonInterface = {text: "Carrito", icon: '../../../assets/icons/cart.svg'};
  headerButtons: ButtonInterface[] = [this.buttonHeaderFirst, this.buttonHeaderSecond];

  // Profile data
  profileData: ProfileData;

  // Cards to be displayed
  products: CardInterface[] = [];
  receipts: CardInterface[] = [];
  displayedCards: CardInterface[] = this.products;
  view: string;

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
  categories: SelectorData[];
  units: SelectorData[];

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

  constructor(private comService: CommunicationService) { }

  ngOnInit(): void {
    this.profileData = this.comService.profileData;
    this.categories = this.comService.categories;
    this.units = this.comService.units;
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

  extractProfile() {
    this.profileData = {
      imageURL: '',
      role: 'Productor',
      name: this.comService.profile.name,
      surnames: this.comService.profile.lastName,
      identificationCard: this.comService.profile.cedula,
      birthDate: this.comService.profile.birthDate,
      phoneNumber: this.comService.profile.phoneN,
      province: this.comService.profile.province,
      canton: this.comService.profile.canton,
      district: this.comService.profile.district,
      score: 5
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
  }
}
