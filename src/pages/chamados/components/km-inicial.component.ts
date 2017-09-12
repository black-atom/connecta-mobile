import { ViewController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  template: `
  <ion-header>
    <ion-toolbar>
      <ion-title>
        KM INICIAL
      </ion-title>
      <ion-buttons start>
        <button ion-button (click)="dismiss()">
          <span ion-text color="primary" showWhen="ios">Cancelar</span>
          <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
        </button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>

  </ion-content>
  `
})

export class KmInicialComponent implements OnInit {
  constructor(
    private viewCtrl: ViewController,
    private params: NavParams,
  ) {
    console.log(this.params.get("id"));
  }


  dismiss() {
    this.viewCtrl.dismiss({km_inicial: 321312});
  }

  ngOnInit() { }
}
