import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';

import { CommunicationService } from '../services/communication.service';

import {finalize} from 'rxjs/operators';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() logInView: string;

  data: any;
  view: string = "";

  userID: string = "";
  password: string = "";

  router: Router;

  constructor(private activatedRoute: ActivatedRoute, private comService: CommunicationService, router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.view = data.view;
    });
  }

  login() {
    if(this.validate(this.userID, this.password)) {
      //var alert;
      let data= {password:this.password}
      //console.log('http://' + this.comService.ipAddress + ':' + this.comService.port + '/api/SignIn/'+ this.view.toLocaleLowerCase() +'/' + this.userID);
      fetch('http://' + this.comService.ipAddress + ':' + this.comService.port + '/api/SignIn/'+ this.view.toLocaleLowerCase() +'/' + this.userID,{   //Client Producer
        method:'POST',
        mode: 'cors',
        body: JSON.stringify(data),
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
           //console.log(json);
           this.comService.token = json;
           //console.log(this.comService.token);
           this.fetchProfile();
         });
      }).catch(async (error) => {

        console.log(error);
      })
    }
    else
    {

    }
  }

  fetchProfile() {
    //console.log('Estoy en Fetch Profile');
    let data = {token:this.comService.token};
    //console.log(this.comService.token);
    console.log(this.userID);
    let endPoint: string = '';
    if(this.view === 'Cliente') {
      endPoint = 'http://' + this.comService.ipAddress + ':' + this.comService.port + '/api/Client/getUserByUserName/' + this.userID;
    }
    else if(this.view === 'Productor') {
      endPoint = 'http://' + this.comService.ipAddress + ':' + this.comService.port + '/api/Producer/getUserByUserName/' + this.userID;
    }
    fetch(endPoint ,{
      method: 'POST',
      mode: 'cors',
      body:JSON.stringify(data),
      headers: {
        'Content-Type':'application/json'
      }
    }).then(response =>{// Maneja los errores
      if(!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }).then((response)=>{
      //console.log(response);
       response.json().then(json=>{
         console.log(json);
         // logica aqui
         this.comService.profile = json;
         console.log('Esta deberia ser la cedula');
         console.log(this.comService.profile.cedula);
         if(this.view === 'Cliente') {
          this.fetchProducersByLocation();
         }
         else if(this.view === 'Productor') {
           console.log('Estamos en fetch products');
          this.fetchProductsByProducer();
         }
         this.comService.location = this.comService.locationNumber(this.comService.profile.province,this.comService.profile.canton,this.comService.profile.district);
         this.userID = '';
         this.password = '';
       })
    })
  }

   fetchProducersByLocation() {
    fetch('http://' + this.comService.ipAddress + ':' + this.comService.port + "/api/Producer/getProducerByLocation/" + this.comService.profile.province + "/" + this.comService.profile.canton + "/" + this.comService.profile.district,{
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
         this.comService.productores = json.map(element=>{
           return {
             name: element.businessName,
             address: element.address,
             sinpeN:element.sinpeN,
             id:element.cedula,
             distrito:element.district,
             score:element.calification,
             imgUrl:element.image,
             productos:element.products.map(product=>{
               return{
                 id:product.id,
                 name:product.name,
                 price:product.cost,
                 category:product.category,
                 quantity:product.inStock,
                 imgUrl:product.image
               };
             })
           };
         })
         json;
         //console.log(this.comService.productores);
       })
    })
  }

  fetchProductsByProducer() {
    //console.log('http://' + this.comService.ipAddress + ':' + this.comService.port + "/api/Product/fetchproductsByProducer/" + this.comService.profile.cedula);
    fetch('http://' + this.comService.ipAddress + ':' + this.comService.port + "/api/Product/fetchproductsByProducer/" + this.comService.profile.cedula, {
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
          this.comService.productos = json.map(element=>{
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
         console.log(this.comService.productos);
         this.navigateToHome();
       })
    })
  }

  validate(userID: string, password: string) {
    if(userID != "" && password != ""){
      return true;
    }
    else {
      console.log("Error, debe ingresar una credencial y contraseña validas");
    }
  }

  navigateToHome() {
    if(this.view === 'Productor'){
      this.router.navigateByUrl('/pages/producer/home');
    }
    else if(this.view === 'Cliente'){
      this.router.navigateByUrl('/pages/client/home');
    }
    
  }
}
