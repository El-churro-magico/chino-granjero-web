import { Component, Input, OnInit, OnChanges} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {AdminService} from '../../admin.service';

@Component({
  selector:'admin-field-card',
  templateUrl:'field-card.component.html',
  styleUrls:['field-card.component.scss']
})

export class FieldCardComponent implements OnInit, OnChanges{

  @Input() card:any;
  @Input() type:string;
  title:string;
  subtitle:any;
  imgUrl;
  id:any;
  closeResult:string;
  razonRechazo:string;

  // Para los tops
  topSeleccionado:any;


  constructor(
    private modalService: NgbModal,
    private adminService: AdminService
  ){
  }

  ngOnInit(){
    this.card = JSON.parse(this.card);
    if(this.type=='afiliacion' || this.type=='productores'){
      this.title = this.card.name + ' ' + this.card.lastName;
      this.subtitle = this.card.phoneN;
      this.imgUrl = this.card.imgUrl;
      this.id = this.card.cedula;
    }else if(this.type=='categorias'){
      this.title = this.card.name;
      this.subtitle = this.card.id;
      this.imgUrl = this.card.imgUrl;
      this.id = this.card.id;
    }else if(this.type=='top'){
      this.title = this.card.tipo
      //this.adminService.fetchTop();
    }
  }

  ngOnChanges(){
    //this.card = JSON.parse(this.card);
  }

  eliminarCard(){
    if(this.type=='afiliacion'){
      this.adminService.productoresPendientes = this.adminService.productoresPendientes
        .filter(element=>element.cedula!=this.id);
    }else if(this.type=='categorias'){
      this.adminService.categorias = this.adminService.categorias.filter(
        element=>element.id != this.id
      )
    }else if(this.type=='productores'){
      this.adminService.productores = this.adminService.productores
        .filter(element=>element.cedula!=this.id);
    }
  }

  dismiss(content){
    if(this.type=='afiliacion'){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `${result}`;
        console.log(this.closeResult);
        if(this.closeResult == 'Submit'){
          console.log('Enviar '+this.razonRechazo+' a '+this.id+' en el rest');
          const data = {
            cedula: this.id,
            name: '',
            lastName: '',
            businessName: '',
            province: '',
            canton: '',
            district: '',
            address: '',
            phoneN: 0,
            birthDate: '',
            sinpeN: 0,
            comment: this.razonRechazo,
            status: 'DENIED',
            password: ''
          };
          fetch('http://25.83.43.98:1234'+'/api/Affilliation/updateAffiliation',{
            method:'PUT',
            mode:'cors',
            body:JSON.stringify(data),
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
              this.eliminarCard();
            })
          }).catch(error=>{
            console.log(error);
          })
          this.eliminarCard();
        }
      }, (reason) => {
        this.closeResult = `${this.getDismissReason(reason)}`;
      });
    }else if(this.type=='productores'){
      fetch('http://25.83.43.98:1234'+'/api/Producer/'+this.id,{
        method:'DELETE',
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
          this.eliminarCard();
        })
      }).catch(error=>{
        console.log(error);
      })
    }

  }

  mostrarInfo(informacionEditableP, informacionEditableC, top){
    let content;
    if(this.type=='productores'||this.type=='afiliacion'){
      content = informacionEditableP;
      console.log('Trying to fetch');

      fetch('http://25.83.43.98:1234'+'/api/Producer/getTops/TPP/'+this.id,{
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
          this.card.top = json.map(element=>{
            return {
              title: element.name,
              subtitle: element.quantity
            }
          })
        })
      }).catch(error=>{
        console.log(error);
      })
    }else if(this.type=='categorias'){
      content = informacionEditableC;
    }else if(this.type=='top'){
      content = top;
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `${result}`;
      console.log(this.closeResult);
      if(this.closeResult == 'Submit' && this.type=='categorias'){
        console.log('Enviar nueva info'+' de '+this.id+' al rest');
        const data = {
          name: this.card.name,
          ID: this.card.id
        }
        fetch('http://25.83.43.98:1234'+'/api/Categories/'+this.id,{
          method:'PUT',
          mode:'cors',
          body:JSON.stringify(data),
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
            this.adminService.fetchCategorias();
          })
        }).catch(error=>{
          console.log(error);
        })
      } else if (this.closeResult=='Submit' && this.type=='productores'){
        const data = this.card;
        fetch('http://25.83.43.98:1234'+'/api/Producer/'+this.id,{
          method:'PUT',
          mode:'cors',
          body:JSON.stringify(data),
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
            this.adminService.fetchProductores();
          })
        }).catch(error=>{
          console.log(error);
        })
      }
    }, (reason) => {
      this.closeResult = `${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'backdrop';
    } else {
      return `${reason}`;
    }
  }

  confirm(){
    console.log('Confirm la solicitud');
    const data = {
      cedula: this.id,
      name: '',
      lastName: '',
      businessName: '',
      province: '',
      canton: '',
      district: '',
      address: '',
      phoneN: 0,
      birthDate: '',
      sinpeN: 0,
      comment: 'Delicioso',
      status: 'ACCEPTED',
      password: ''
    };
    fetch('http://25.83.43.98:1234'+'/api/Affilliation/updateAffiliation',{
      method:'PUT',
      mode:'cors',
      body:JSON.stringify(data),
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
        this.eliminarCard();
      })
    }).catch(error=>{
      console.log(error);
    })
  }
}
