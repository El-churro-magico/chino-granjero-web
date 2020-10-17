import { Injectable } from '@angular/core';

import {CrPcdService} from 'cr-pcd';

import { User } from '../classes/user';
import { Profile } from '../classes/profile';
import { Producer } from '../classes/producer';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})

export class CommunicationService {
  ipAddress: string="25.83.43.98";
  port: string="1234";

  token: String = '';
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
  productores: Producer[];

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
    /*this.productores = null;
    this.productorCargado = null;
    this.carrito = null;
    this.notificaciones = null;*/
    this.location =null;
    this.token = null;
  }
}
