import { Component, OnInit, Input } from '@angular/core';
import { LogInInterface } from '../../shared/LogInInterface';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() logInView: string;

  constructor() { }

  ngOnInit(): void {
  }

}
