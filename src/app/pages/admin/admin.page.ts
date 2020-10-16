import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';

import {AdminService} from './admin.service';


@Component({
  selector:'app-admin',
  templateUrl:'admin.page.html',
  styleUrls:['admin.page.scss']
})

export class AdminPage{
  constructor(
    public adminService: AdminService
  ){}

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

}
