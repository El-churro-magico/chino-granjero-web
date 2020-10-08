import { Component, OnInit, Input } from '@angular/core';

import { ButtonInterface } from '../ButtonInterface';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() headerButtons: ButtonInterface[];
  
  buttonFirst: ButtonInterface;
  buttonSecond: ButtonInterface;

  constructor() { }

  ngOnInit(): void {
    this.buttonFirst = this.headerButtons[0];
    this.buttonSecond = this.headerButtons[1];
  }

}
