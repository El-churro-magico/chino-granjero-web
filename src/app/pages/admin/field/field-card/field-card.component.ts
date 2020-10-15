import { Component, Input, OnInit} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector:'admin-field-card',
  templateUrl:'field-card.component.html',
  styleUrls:['field-card.component.scss']
})

export class FieldCardComponent implements OnInit{

  @Input() card:any;
  @Input() type:string;
  title:string;
  subtitle:any;
  imgUrl;
  id:any;
  closeResult:string;
  razonRechazo:string;

  constructor(
    private modalService: NgbModal
  ){
  }

  ngOnInit(){
    console.log(this.type);
    //console.log(this.card);

    this.card = JSON.parse(this.card);
    if(this.type=='afiliacion'){
      this.title = this.card.name + ' ' + this.card.lastName;
      this.subtitle = this.card.phoneN;
      this.imgUrl = this.card.imgUrl;
      this.id = this.card.cedula;
    }
  }

  dismiss(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `${result}`;
      console.log(this.closeResult);
      if(this.closeResult == 'Submit'){
        console.log('Enviar '+this.razonRechazo+' a '+this.id+' en el rest');
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
  }
}
