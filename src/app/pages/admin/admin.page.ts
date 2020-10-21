import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';

import {AdminService} from './admin.service';


@Component({
  selector:'app-admin',
  templateUrl:'admin.page.html',
  styleUrls:['admin.page.scss']
})

export class AdminPage implements OnInit{
  constructor(
    public adminService: AdminService
  ){}

  ngOnInit(){
    this.adminService.fetchProductoresPendientes();
  }

  afiliacionCards():string{
    const resultado:any = JSON.stringify(this.adminService.productoresPendientes);
    return resultado;
  }

  productoresCards():string{
    const resultado:any = JSON.stringify(this.adminService.productores);
    return resultado;
  }

  categoriasCards():string{
    const resultado:any = JSON.stringify(this.adminService.categorias);
    return resultado;
  }

  topCards():string{
    const resultado:any = JSON.stringify(this.adminService.top);
    return resultado;
  }

}
