import { Component } from '@angular/core';
import { App, IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: "page-almoco",
  templateUrl: "almoco.html"
})

export class AlmocoPage {
  tipo = 'almoco'
  constructor() {
   }

}
