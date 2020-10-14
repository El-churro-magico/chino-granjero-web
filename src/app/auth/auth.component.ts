import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  view: string = "client";

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  navigate(view: string) {
    console.log("Estamos navegando");
    this.router.navigateByUrl('login');
  }

}
