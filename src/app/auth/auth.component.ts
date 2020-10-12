import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  view: boolean = true;
  login: boolean = false;
  register: boolean = false;

  selectedView: string = "";
  userId: string = "";

  constructor() { }

  ngOnInit(): void {
    console.log(this.view);
  }

  switchToLogin() {
    this.view = false;
    this.register = false;
    this.login = true;
  }

  switchToRegister() {
    this.view = false;
    this.login = false;
    this.register = true;
  }

}
