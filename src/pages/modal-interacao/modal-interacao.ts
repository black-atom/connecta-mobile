import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the ModalInteracaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-interacao',
  templateUrl: 'modal-interacao.html',
})
export class ModalInteracaoPage {

  mesmoRelogio: boolean = true;
  houveRemocao: boolean = false;
  retornarLocal: boolean = false;
  houveTreinamento: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  }

  fecharModal() {
    this.view.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalInteracaoPage');
  }


}
