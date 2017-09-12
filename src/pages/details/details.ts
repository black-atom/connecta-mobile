import { AppState } from '../../redux/reducers';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  private selectedId = null;

  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<AppState>
  ) {
  }

  ionViewDidLoad() {
    this.selectedId = this.navParams.get('id');
    console.log("Usuario selecionou atendimento "+ this.selectedId)
  }

}
