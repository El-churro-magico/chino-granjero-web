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
          this.eliminarCard();
        }
      }, (reason) => {
        this.closeResult = `${this.getDismissReason(reason)}`;
      });
    }else{
      this.eliminarCard();
    }

  }

  mostrarInfo(informacionEditableP, informacionEditableC){
    let content;
    if(this.type=='productores'||this.type=='solicitud'){
      content = informacionEditableP;
    }else if(this.type=='categorias'){
      content = informacionEditableC;
    }

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `${result}`;
      console.log(this.closeResult);
      if(this.closeResult == 'Submit'){
        console.log('Enviar nueva info'+' de '+this.id+' al rest');
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
    console.log('Confirm la soliciutd');
    this.eliminarCard();
  }
}
