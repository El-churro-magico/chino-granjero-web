import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CrPcdService } from 'cr-pcd';

import { SelectorData } from '../selectorData';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  imageURL: string;
  name: string;
  lastNames: string;
  identification: string;
  province: any;
  canton: any;
  district: any;
  birthDate: Date;
  phoneNumber: string;

  provinces: SelectorData[] = [];
  cantons: SelectorData[] = [];
  districts: SelectorData[] = [];

  constructor(private crPcdService: CrPcdService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getProvinces();
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
}
