import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() logInView: string;

  data: any;
  view: string = "";

  userID: string = "";
  password: string = "";

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.view = data.view;
    });
  }

  login() {
    console.log(this.userID, this.password);
    if(this.validate(this.userID, this.password)) {
      console.log("Estoy adentro >:]");
    }
    else {
      console.log("Te mamaste wey");
    }
  }

  validate(userID: string, password: string) {
    if(userID != "" && password != ""){
      return true;
    }
    else {
      console.log("Error, debe ingresar un correo y contraseña validos");
    }
  }

}
