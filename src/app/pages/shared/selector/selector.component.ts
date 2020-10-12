import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectorData } from '../selectorData';

@Component({
  selector: 'selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {
  @Input() elementList: SelectorData[];
  @Input() placeHolder: string;
  
  @Output() clickedEvent = new EventEmitter<SelectorData>();

  panelColor = new FormControl('C4C4C4, 40%');

  constructor() { }

  ngOnInit(): void {
  }

  optionSelected(element: SelectorData) {
    this.clickedEvent.emit(element);
  }

}
