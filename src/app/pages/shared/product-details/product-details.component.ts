import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CardInterface } from '../CardInterface';
import { SelectorData } from '../SelectorData';
import { EventData } from '../EventData';
import { Product } from '../classes/product';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @Input() cardData: CardInterface;
  @Input() producerView: boolean;
  @Input() categories: SelectorData[];
  @Input() units: SelectorData[];
  @Output() raiseEvent = new EventEmitter<EventData>();

  ID: string = "";
  producerID = "";
  name: string = "Nombre del Producto";
  imageURL: string = "";
  description: string = "Descripción del producto";
  category: string = "";
  unit: string = "";
  availability: number = 0;

  newProduct: boolean = false;
  newProductData: Product = new Product;
  iconSource: any = "../../../../assets/icons/add-product-picture.svg";
  image: File;

  // For client view
  quantity: number = 1;

  constructor() { }

  ngOnInit(): void {
    if(this.cardData === undefined) {
      this.newProduct = true;
    }
    else {
      this.ID = this.cardData.productID;
      this.name = this.cardData.title;
      this.imageURL = this.cardData.imageURL;
      this.description = this.cardData.description;
      this.category = this.cardData.category;
      this.unit = this.cardData.unit;
      this.availability = this.cardData.availability;
    }
    console.log(this.newProduct);
  }

  onFileChanged(event) {
    this.image = event.target.files[0];
    let fileReader = new FileReader();
    try {
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = (_event) => {
        this.iconSource = fileReader.result;
      }
    }
    catch(err) {
      this.iconSource = "../../../../assets/icons/add-profile-picture.svg";
      this.image = null;
    }
  }

  selectedCategory($event: SelectorData) {
    this.category = $event.name;
  }

  selectedUnit($event: SelectorData) {
    this.unit = $event.name;
  }

  onActionClicked(event: string) {
    let newProcuct = true;
    if((event === 'saveProduct') && this.newProduct) {
      console.log(this.name, this.description, this.category, this.unit, this.availability);
      if(this.name != "Nombre del Producto") {
        if(this.description != "Descripción del producto") {
          if(this.category != "") {
            if(this.unit != "") {
              if(this.availability != 0) {
                this.newProductData.id = 0;
                this.newProductData.producer = 0;
                this.newProductData.image = 'https://www.eluniverso.com/sites/default/files/styles/powgallery_1024/public/fotos/2019/11/4999580600000578-0-image-a-14_1519635137261.jpg?itok=VAufZaEh';
                this.newProductData.name = this.name;
                this.newProductData.category = 7;
                this.newProductData.saleMode = this.unit;
                this.newProductData.inStock = this.availability;
                this.newProductData.quantity = 0;
                this.raiseEvent.emit({
                  eventID: event,
                  attached: this.newProductData
                });
              }
              else {
                console.log("No sirve availability");
                newProcuct = false;
              }
            }
            else {
              console.log("No sirve unit");
              newProcuct = false;
            }
          }
          else {
            console.log("No sirve category");
            newProcuct = false;
          }
        }
        else {
          console.log("No sirve description");
          newProcuct = false;
        }
      }
      else {
        console.log("No sirve name");
        newProcuct = false;
      }
    }
    else {
      this.raiseEvent.emit({
        eventID: event,
        attached: this.cardData
      });
    }
  }

}
