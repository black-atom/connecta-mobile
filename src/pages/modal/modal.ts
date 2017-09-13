import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  opcao: any;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private view: ViewController)
     {
       const opcoes =
       [{
           titulo: 'KM inicial',
           icon: 'fa fa-flag-o'
        },
        {
          titulo: 'KM final',
          icon: 'fa fa-flag-checkered'
        },
       ];
       this.opcao = opcoes[this.navParams.get('opcao')];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  closeModal() {
    this.view.dismiss();
  }

}
