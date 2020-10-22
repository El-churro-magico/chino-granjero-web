import { Component, OnInit } from '@angular/core';

import { CommunicationService } from '../shared/services/communication.service';

import { Profile } from '../shared/classes/profile';

import { ButtonInterface } from '../shared/ButtonInterface';
import { CardInterface } from '../shared/CardInterface';
import { DisplayerData } from '../shared/DisplayerData';
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
  profileData: ProfileData;

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
    this.comService.fetchProductsByProducer();
    this.extractProfile();
    this.extractProducts();
    this.categories = this.comService.categories;
    this.units = this.comService.units;
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
      imageURL: 'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
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

  extractProducts() {
    this.products = [];
    for(let i = 0; i < this.comService.productos.length; i++) {
      console.log(this.comService.productos[i].image);
      this.products.push({
        newProduct: false,
        productID: this.comService.productos[i].id.toString(),
        producerID: this.comService.productos[i].producer.toString(),
        orderID: '',
        imageURL: this.comService.productos[i].image,
        title: this.comService.productos[i].name,
        rating: (Math.random() * (5-3) + 3),
        ETA: '',
        description: 'Optional description',
        category: this.comService.productos[i].category.toString(),
        unit: this.comService.productos[i].saleMode,
        availability: this.comService.productos[i].inStock,
        receiptData: null
      })
    }
    this.products.push({
      newProduct: true,
      productID: "",
      producerID: "",
      orderID: "",
      imageURL: "",
      title: "",
      rating: 0,
      ETA: "",
      description: "",
      category: "",
      unit: '',
      availability: 0,
      receiptData: null
    });
  }

  extractReceipts() {

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
      case 'saveProduct': {
        this.saveProduct($event)
        break;
      }
      case 'deleteProduct': {
        this.deleteProduct($event)
        break;
      }
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
    this.comService.fetchProductsByProducer();
    this.extractProducts();
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

  saveProduct(event: EventData) {
    console.log('Deberia agregar esta kk YA YA');
    event.attached.producer = this.comService.profile.cedula;
    fetch('http://' + this.comService.ipAddress + ':' + this.comService.port + '/api/Product/'+ event.attached.productID,{   //Client Producer
    method:'POST',
    mode: 'cors',
    body: JSON.stringify(event.attached),
    headers:{
      'Content-Type':'application/json'
    }
    }).then(response =>{// Maneja los errores
      if(!response.ok){
        throw Error(response.statusText);
      }
      return response;
    }).then(async (response)=>{
      response.json().then((json)=>{
        // logica aqui

      });
    }).catch(async (error) => {

      console.log(error);
    })
    this.hidePopUp();
    this.comService.fetchProductsByProducer();
    this.extractProducts();
  }

  deleteProduct(event: EventData) {
    console.log('Deberia eliminar esta kk YA YA');
    fetch('http://' + this.comService.ipAddress + ':' + this.comService.port + '/api/Product/'+ event.attached.productID,{   //Client Producer
      method:'DELETE',
      mode: 'cors',
      headers:{
        'Content-Type':'application/json'
    }
    }).then(response =>{// Maneja los errores
      if(!response.ok){
        throw Error(response.statusText);
      }
      return response;
    }).then(async (response)=>{
      response.json().then((json)=>{
        // logica aqui

      });
    }).catch(async (error) => {

      console.log(error);
    })
    this.hidePopUp();
    this.comService.fetchProductsByProducer();
    this.extractProducts();
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
