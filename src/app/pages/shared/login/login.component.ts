import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute, private comService: CommunicationService,) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.view = data.view;
    });
    this.fetchProducersByLocation();
    //console.log(this.fetchProducersByLocation());
  }

  login() {
    if(this.validate(this.userID, this.password)) {
      //var alert;
      console.log(this.userID+"\n"+this.password);

      let data= {password:this.password}

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
           console.log(json);
           this.comService.token = json;
           console.log(this.comService.token);
           this.fetchProfile();
         });
      }).catch(async (error) => {

        console.log("Contrase")
        // Agarran los errores
          /*alert = await this.alertController.create({
          header: 'Alert',
          message:'Error: El usuario o contrasena proporcionado es incorrecto!',
          buttons:['Ok']
        })
        await alert.present();*/
        console.log(error);
      })
    }
    else
    {
      /*const alert= await this.alertController.create({
        header: 'Campos faltantes!',
        message: 'Por favor llene todos los campos correspondientes!',
        buttons:['Ok']
      });
      await alert.present();*/
    }
  }

  async fetchProfile() {
    var alert;
    let data={token:this.comService.token};
    console.log(this.comService.token);
    fetch('http://' + this.comService.ipAddress + ':' + this.comService.port + '/api/Client/getUserByUserName/' + this.userID,{
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
      console.log(response);
       response.json().then(json=>{
         console.log(json);
         // logica aqui
         this.comService.profile = json;
         this.fetchProducersByLocation();
         this.comService.location = this.comService.locationNumber(this.comService.profile.province,this.comService.profile.canton,this.comService.profile.district)
         this.userID = '';
         this.password = '';
         //this.router.navigate(['/home']);
       })
    })
  }

  async fetchProducersByLocation() {
    var alert;

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
         console.log(json);
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
         console.log(this.comService.productores);
       })
    })
  }

  validate(userID: string, password: string) {
    if(userID != "" && password != ""){
      return true;
    }
    else {
      console.log("Error, debe ingresar un correo y contraseña validos");
    }
  }

}
