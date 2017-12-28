import { Component } from '@angular/core';
import { App, IonicPage, ModalController, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: "page-outros",
  templateUrl: "outros.html"
})

export class OutrosPage {
  tipo = 'Outros'
  constructor(){
}
}
