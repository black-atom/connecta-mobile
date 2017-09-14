import { AppState } from './../../redux/reducers/index';
import { Store } from '@ngrx/store';
import { FIM_ATENDIMENTO } from './../../redux/actions/atendimentos';
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
  private selectedId = null;

  constructor(
    public navCtrl: NavController,
    private store: Store<AppState>,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.selectedId = this.navParams.get("_id");
  }

  onSlideChangeStart(slider: Slides) {
    //this.showSkip = !slider.isEnd();
    console.log('acabaou '+slider.isEnd());
  }

  finalizar(){
    this.store.dispatch({
      type: FIM_ATENDIMENTO,
      payload: {
        _id: this.selectedId
      }
    })
    this.navCtrl.pop();
  }

}
