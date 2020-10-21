import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { EventData } from '../../shared/EventData';
import { ButtonInterface } from '../ButtonInterface';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() headerButtons: ButtonInterface[];
  @Output() raiseEvent = new EventEmitter<EventData>();

  buttonFirst: ButtonInterface;
  buttonSecond: ButtonInterface;

  constructor() { }

  ngOnInit(): void {
    this.buttonFirst = this.headerButtons[0];
    this.buttonSecond = this.headerButtons[1];
  }

  onActionClicked(event: string) {
    this.raiseEvent.emit({
      eventID: event,
      attached: null
    });
  }
}
