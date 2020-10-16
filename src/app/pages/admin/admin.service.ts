import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})

export class AdminService{

  categorias:{
    name:string,
    id:number,
    imgUrl:string
  }[]=[{
    name:'Sentables',
    id:1111,
    imgUrl:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstylelovely.com%2Fwp-content%2Fuploads%2Fnivea-tonico-productos-beauty-pieles-sensibles.jpg&f=1&nofb=1'
  }]

  productoresPendientes: {
    cedula:number,
    name:string,
    lastName:string,
    businessname:string,
    province:string,
    canton:string,
    district:string,
    address:string,
    phoneN:number,
    birthDate:string,
    sinpeN:number,
    imgUrl:string
  }[]=[{
    cedula: 111111111,
    name:'Oscar',
    lastName: 'de la Olla',
    businessname: 'Emporio de la Olla',
    province:'Alajuela',
    canton: 'Central',
    district: 'Alajuela',
    address:'Por ay',
    phoneN:88888888,
    birthDate:'01/01/2000',
    sinpeN:88888888,
    imgUrl:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkeenthemes.com%2Fpreview%2Fmetronic%2Ftheme%2Fassets%2Fpages%2Fmedia%2Fprofile%2Fpeople19.png&f=1&nofb=1'
  }];

  productores:{
    cedula:number,
    name:string,
    lastName:string,
    businessname:string,
    province:string,
    canton:string,
    district:string,
    address:string,
    phoneN:number,
    birthDate:string,
    sinpeN:number,
    imgUrl:string
  }[]=[{
    cedula: 111111111,
    name:'Oscar',
    lastName: 'de la Olla',
    businessname: 'Emporio de la Olla',
    province:'Alajuela',
    canton: 'Central',
    district: 'Alajuela',
    address:'Por ay',
    phoneN:88888888,
    birthDate:'01/01/2000',
    sinpeN:88888888,
    imgUrl:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkeenthemes.com%2Fpreview%2Fmetronic%2Ftheme%2Fassets%2Fpages%2Fmedia%2Fprofile%2Fpeople19.png&f=1&nofb=1'
  }];

  constructor(){}
}
