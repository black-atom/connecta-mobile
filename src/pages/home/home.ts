import { Component } from '@angular/core';
import { App, IonicPage, ModalController, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})

export class HomePage {
  tipo = 'Home'
  constructor(){
}
}
