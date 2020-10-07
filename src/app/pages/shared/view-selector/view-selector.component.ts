import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'view-selector',
  templateUrl: './view-selector.component.html',
  styleUrls: ['./view-selector.component.scss']
})
export class ViewSelectorComponent implements OnInit {
  title: string = "ChinoGranjero";

  constructor() { }

  ngOnInit(): void {
  }

}
