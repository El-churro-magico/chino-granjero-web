import { Injectable } from '@angular/core';

import {CrPcdService} from 'cr-pcd';

import { User } from '../classes/user';
import { Profile } from '../classes/profile';
import { Producer } from '../classes/producer';
import { Product } from '../classes/product';

import { ButtonInterface } from '../ButtonInterface';
import { CardInterface } from '../CardInterface';
import { DisplayerData } from '../DisplayerData';
import { OrderInterface } from '../OrderInterface';
import { ProductDetails } from '../ProductDetails';
import { ProfileData } from '../ProfileData';
import { ReceiptData } from '../ReceiptData';
import { SelectorData } from '../SelectorData';
import { EventData } from '../EventData';

@Injectable({
  providedIn: 'root'
})

export class CommunicationService {
  ipAddress: string="25.83.43.98";
  port: string="1234";

  token: string = '';
  location: number = 20101;
  profile: Profile;
  
  tmpUser: User={
    username:'cvaz',
    name: 'Chino Yock',
    birthDate:'3/12/2020',
    phone:'0000 0000',
    identificationCard:'1 1111 1111',
    address: 'Del palo de mango, 500mts al norte'
  }

  tmpProducer: Producer;

  productores: Producer[];

  productos: Product[];

  cart: {
    product:Product,
    quantity:number
  }[]=[];









  // CLASSES YET TO BE IMPLEMENTED
  // Profile data
  profileData: ProfileData = {
    imageURL: 'https://ichef.bbci.co.uk/news/410/cpsprodpb/162E3/production/_103115809_robbierotten.jpg',
    role: "Producer",
    name: "Robbie",
    surnames: "Rotten",
    identificationCard: 802156645,
    birthDate: '10/4/2000',
    phoneNumber: 89675543,
    province: "Heredia",
    canton: "Santa Barbara",
    district: "Canton de santa barbara",
    score: 4.5
  }

  // General
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












  constructor(private crPcdService: CrPcdService) { }

  locationNumber(provincia:String, canton:String, distrito:String){
    const provincias = this.crPcdService.getProvinces();
    let provinciaNum:number = 0;
    let i:number = 1;
    // Get provincia
    console.log(provincia);
    console.log(provincias);
    while(provincias[i] != undefined){
      if(provincias[i] == provincia){
        provinciaNum = i;
      }
      i+=1;
    }
    // Get canton
    const cantones:number = this.crPcdService.getCantons(provinciaNum.toString());
    console.log(cantones);
    console.log(provinciaNum.toString());


    let cantonNum:number =0;
    i = provinciaNum*100+1;
    while(cantones[i]!=undefined){
      if(cantones[i] == canton){
        cantonNum = i;
      }
      i+=1;
    }
    // Get district
    const distritos:number = this.crPcdService.getDistricts(cantonNum.toString());
    let distritoNum:number = 0;
    i = cantonNum*100+1;
    while(distritos[i]!=undefined){
      if(distritos[i]==distrito){
        distritoNum = i;
      }
      i+=1;
    }
    return distritoNum;
  }

  limpiar(){
    this.tmpUser = null;
    this.productores = null;
    this.tmpProducer = null;
    this.cart = null;
    //this.notificaciones = null;
    this.location =null;
    this.token = null;
  }

  fetchProductsByProducer() {
    fetch('http://' + this.ipAddress + ':' + this.port + "/api/Product/fetchproductsByProducer/" + this.profile.cedula, {
      method:'GET',
      mode: 'cors',
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response =>{// Maneja los errores
      if(!response.ok) {
        throw Error(response.statusText);
      }
        return response;
      }).then((response)=>{
        response.json().then(json=>{
          // logica aqui
          //console.log(json);
          this.productos = json.map(element=>{
            return {
              id: element.id,
              name: element.name,
              category: element.category,
              producer: element.producer,
              image: element.image,
              cost: element.cost,
              saleMode: element.saleMode,
              inStock: element.inStock,
              quantity: element.quantity
           };
         })
         json;
         console.log(this.productos);
       })
    })
  }
}
