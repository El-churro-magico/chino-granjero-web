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

  convertToString():string{
    this.adminService.productoresPendientes.toString = function(){return JSON.stringify(this)};
    const resultado = this.adminService.productoresPendientes.toString()
    return resultado;
  }

}
