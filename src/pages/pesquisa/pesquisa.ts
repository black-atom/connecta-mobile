import { AppState } from './../../redux/reducers/index';
import { Avaliacao } from '../../models/atendimento';
import { Store } from '@ngrx/store';
import { AdicionarPerguntas } from './../../redux/actions/atendimentos';

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
  private avaliacao: Avaliacao[] = [];

  constructor(
    public navCtrl: NavController,
    private store: Store<AppState>,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.selectedId = this.navParams.get("_id");
    this.slides.lockSwipes(true)
  }

  nextSlide(){

    this.slides.lockSwipes(false)
    this.slides.slideNext();
    this.slides.lockSwipes(true)

  }
  onSlideChangeStart(slider: Slides) {
    console.log('acabaou '+slider.isEnd());
  }

  iniciarAvaliacao(){
   this.nextSlide();
  }

  finalizar(){

    this.store.dispatch(new AdicionarPerguntas({
      _id : this.selectedId,
      avaliacao: this.avaliacao
    }));
    this.navCtrl.pop();
  }

  pergunta(pergunta, resposta){
    console.log(pergunta + ' ' +resposta);
    this.avaliacao.push({
      pergunta,
      valor: resposta
    });
    this.nextSlide();
  }

}
