import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CrPcdService } from 'cr-pcd';
import { ActivatedRoute } from '@angular/router';

import { SelectorData } from '../SelectorData';
import { Profile } from '../classes/profile';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  newProfile: Profile = null;
  view: string = "";
  accepted: boolean = true;
  iconSource: any = "../../../../assets/icons/add-profile-picture.svg";

  image: File;
  name: string = "";
  lastNames: string = "";
  identification: string = "";
  province: string = "";
  canton: string = "";
  district: string = "";
  birthDate: Date = null;
  phoneNumber: string = "";

  provinces: SelectorData[] = [];
  cantons: SelectorData[] = [];
  districts: SelectorData[] = [];

  constructor(private crPcdService: CrPcdService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.view = data.view;
    });
    this.getProvinces();
  }

  onFileChanged(event) {
    this.image = event.target.files[0];
    let fileReader = new FileReader();
    try {
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = (_event) => {
        this.iconSource = fileReader.result;
      }
    }
    catch(err) {
      this.iconSource = "../../../../assets/icons/add-profile-picture.svg";
      this.image = null;
    }
  }

  getProvinces() {
    const provincesObject = this.crPcdService.getProvinces();

    let i = 1;
    while(provincesObject[i] != undefined) {
      const element = provincesObject[i];
      this.provinces.push({
        identifier: i,
        name: element
        });
      i += 1;
    }
  }

  selectedProvince($event: SelectorData) {
    this.province = $event.name;
    const cantonsObject = this.crPcdService.getCantons($event.identifier.toString());
    this.cantons = [];
    this.districts = [];

    let i = $event.identifier*100 + 1;
    while (cantonsObject[i] != undefined) {
      const element = cantonsObject[i];
      this.cantons.push({
        identifier: i,
        name: element
        });
      i = i+1;
    }
  }

  selectedCanton($event: SelectorData) {
    this.canton = $event.name
    const districtObject = this.crPcdService.getDistricts($event.identifier.toString());
    this.districts = [];

    let i = $event.identifier*100 + 1;
    while (districtObject[i] != undefined) {
      const element = districtObject[i];
      this.districts.push({
        identifier: i,
        name: element
        });
      i = i+1;
    }
  }

  selectedDistrict($event: SelectorData) {
    this.district = $event.name;
  }

  validateInput(): boolean {
    console.log(this.name, this.lastNames, this.identification, this.province, this.canton, this.district, this.identification, this.phoneNumber);
    this.accepted = true;
    this.validatePicture();
    this.validateNames();
    this.validateID();
    this.validateLocation();
    this.validateBirthDate();
    this.validatePhone();
    if(this.accepted === true){
      this.newProfile = {
        /*cedula: Number(this.identification),
        name: this.name,
        lastName: this.lastNames,
        province: this.province,
        canton: this.canton,
        district: this.district,
        address: '',
        phoneN: Number(this.phoneNumber),
        userName: Number(this.identification),
        birthDate: this.birthDate.toDateString(),
        notifications: null*/
        address: '',
        birthDate: this.birthDate.toDateString(),
        businessName: '',
        calification: 5,
        canton: this.canton,
        cedula: Number(this.identification),
        deliveryPlaces: '',
        district: this.district,
        image: '',
        lastName: this.lastNames,
        name: this.name,
        phoneN: Number(this.phoneNumber),
        products: [],
        province: this.province,
        sinpeN: Number(this.phoneNumber),
      }
      console.log("Ha sido aceptado");
      return true;
    }
    else {
      console.log("Error, ha sido rechazado");
      return false;
    }
  }

  validatePicture(): boolean {
    if(this.image != null) {
      return true;
    }
    else {
      console.log("Debe subir una imagen de perfil");
      this.accepted = false;
      return false;
    }
  }

  validateNames(): boolean {
    if((this.name != "") && (this.lastNames != "")){
      return true;
    }
    else {
      console.log("Nombre incorrecto");
      this.accepted = false;
      return false;
    }
  }

  validateID(): boolean {
    if((this.identification.length === 9) && this.isNumeric(this.identification)){
      return true;
    }
    else {
      console.log("ID rechazada");
      this.accepted = false;
      return false;
    }
  }

  isNumeric(value: string): boolean{
    return !isNaN(Number(value));
  }

  validateLocation(): boolean {
    if(this.province != ""){
      if(this.canton != ""){
        if(this.district != ""){
          return true;
        }
        else {
          console.log("Distrito rechazado");
          this.accepted = false;
          return false;
        }
      }
      else {
        console.log("Canton rechazado");
        this.accepted = false;
        return false;
      }
    }
    else {
      console.log("Provincia rechazada");
      this.accepted = false;
      return false;
    }
  }

  validateBirthDate(): boolean {
    if(this.birthDate != null) {
      return true;
    }
    else {
      console.log("Cumpleaños rechazado");
      this.accepted = false;
      return false;
    }
  }

  validatePhone(): boolean {
    console.log("Este es el largo del telefono");
    console.log(this.phoneNumber.length);
    if((this.phoneNumber.length === 8) && this.isNumeric(this.phoneNumber)) {
      return true;
    }
    else {
      console.log("Telefono rechazado");
      this.accepted = false;
      return false;
    }
  }
}
