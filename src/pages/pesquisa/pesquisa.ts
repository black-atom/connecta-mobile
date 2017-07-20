import { TabsPage } from '../tabs/tabs';

import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the PesquisaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-pesquisa',
  templateUrl: 'pesquisa.html',
})
export class PesquisaPage {
  @ViewChild('slides') slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PesquisaPage');
  }

  onSlideChangeStart(slider: Slides) {
    //this.showSkip = !slider.isEnd();
    console.log('acabaou '+slider.isEnd());
  }

  finalizar(){
    this.navCtrl.setRoot(TabsPage);
  }

}
