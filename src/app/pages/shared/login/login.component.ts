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

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("Estamos en login")
    this.activatedRoute.data.subscribe(data => {
      this.view = data.view;
    });
    console.log(this.view);
  }

}
