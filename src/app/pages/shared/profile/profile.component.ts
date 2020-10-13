import { Component, Input, OnInit } from '@angular/core';
import { CrPcdService } from 'cr-pcd';

import { ProfileData } from '../ProfileData';
import { SelectorData } from '../selectorData';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() profileData: ProfileData;

  edit: boolean = false;

  provinces: SelectorData[] = [];
  cantons: SelectorData[] = [];
  districts: SelectorData[] = [];
  province: any;
  canton: any;
  district: any;

  constructor(private crPcdService: CrPcdService) { }

  ngOnInit(): void {
    this.getProvinces();
  }

  enableEdit() {
    this.edit = true;
  }

  disableEdit() {
    this.edit = false;
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
