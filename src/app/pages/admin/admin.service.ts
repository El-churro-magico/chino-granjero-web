import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})

export class AdminService{

  top:{
    tipo:string,
    campo:any[] // Aqui se guardan los 10 productos o 10 clientes
  }[]=[];

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
    imgUrl:string,
    top:{
      title:string,
      subtitle: string
    }[]
  }[];

  constructor(){}

  fetchProductoresPendientes(){
    this.productoresPendientes = [];
    const data = {};
    fetch('http://25.83.43.98:1234'+'/api/Affilliation',{
      method:'GET',
      mode:'cors',
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response=>{
      if(!response.ok){
        throw Error(response.statusText);
      }
      return response;
    }).then(response=>{
      response.json().then(json=>{
        // Logica aqui
        this.productoresPendientes = json;
        console.log(this.productoresPendientes);
      })
    }).catch(error=>{
      console.log(error);
    })
  }

  fetchCategorias(){
    this.categorias = [];
    fetch('http://25.83.43.98:1234'+'/api/Categories',{
      method:'GET',
      mode:'cors',
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response=>{
      if(!response.ok){
        throw Error(response.statusText);
      }
      return response;
    }).then(response=>{
      response.json().then(json=>{
        // Logica aqui
        this.categorias = json.map(element=>{
          return {
            id:element.ID,
            name:element.name,
            imgUrl:''
          }
        });
        console.log(json);

        console.log(this.productoresPendientes);
      })
    }).catch(error=>{
      console.log(error);
    })
  }

  fetchProductores(){
    this.productores = [];
    fetch('http://25.83.43.98:1234'+'/api/Producer',{
      method:'GET',
      mode:'cors',
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response=>{
      if(!response.ok){
        throw Error(response.statusText);
      }
      return response;
    }).then(response=>{
      response.json().then(json=>{
        // Logica aqui
        this.productores = json;
        console.log(this.productoresPendientes);
      })
    }).catch(error=>{
      console.log(error);
    })
  }

  fetchTop(){  // Se trae el top de la base de datos y lo guarda
    console.log('Trayendose el top...');

    const data = {};
    this.top=[];

    // Fetch para los productos mas vendidos
    fetch('http://25.83.43.98:1234'+'/api/Producer/getTops/SP/1',{
      method:'GET',
      mode:'cors',
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response=>{
      if(!response.ok){
        throw Error(response.statusText);
      }
      return response;
    }).then(response=>{
      response.json().then(json=>{
        // Logica aqui
        console.log(json);
        this.top = [
          ...this.top,
          {
            tipo:'Productos más vendidos',
            campo:json.map(element=>{
              return {
                title:element.name,
                subtitle:element.quantity
              }
            })
          }
        ];
      })
    }).catch(error=>{
      console.log(error);
    })

    fetch('http://25.83.43.98:1234'+'/api/Producer/getTops/CG/1',{
      method:'GET',
      mode:'cors',
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response=>{
      if(!response.ok){
        throw Error(response.statusText);
      }
      return response;
    }).then(response=>{
      response.json().then(json=>{
        // Logica aqui
        console.log(json);
        this.top = [...this.top,
          {
            tipo:'Productos con más ganancias',
            campo:json.map(element=>{
              return {
                title:element.name,
                subtitle:element.quantity
              }
            })
          }
        ];
      })
    }).catch(error=>{
      console.log(error);
    })

    fetch('http://25.83.43.98:1234'+'/api/Producer/getTops/TB/1',{
      method:'GET',
      mode:'cors',
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response=>{
      if(!response.ok){
        throw Error(response.statusText);
      }
      return response;
    }).then(response=>{
      response.json().then(json=>{
        // Logica aqui
        console.log(json);
        this.top = [...this.top,
          {
            tipo:'Clientes con más compras',
            campo:json.map(element=>{
              return {
                title:element.name+' '+element.lastName,
                subtitle:element.compras
              }
            })
          }
        ];
      })
    }).catch(error=>{
      console.log(error);
    })

  }
}
