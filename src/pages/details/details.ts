import { FIM_ATENDIMENTO } from '../../redux/actions/atendimentos';
import { Atendimento } from './../../models/atendimento';
import { Observable } from 'rxjs/Rx';
import { AppState } from '../../redux/reducers';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ModalPage } from './../modal/modal';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  private selectedId = null;
  public atendimento$: Observable<Atendimento>;

  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<AppState>,
    private modal: ModalController
  ) {
  }

  ionViewDidLoad() {
    this.selectedId = this.navParams.get('id');
    this.atendimento$ = this.store.select(appState =>
      appState.atendimentos
        .find(atendimento => atendimento._id == this.selectedId)
    );

  }

  openModal(opcao) {
    const modal = this.modal.create(ModalPage, opcao);
    modal.present();
  }

  finalizarAtendimento(){
    this.store.dispatch({
      type: FIM_ATENDIMENTO,
      payload: {
        _id: this.selectedId
      }
    })
  }

}
