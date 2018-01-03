import { Component } from '@angular/core';
import { App, IonicPage, ModalController, NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { AppState } from './../../redux/reducers/index';
import { getMonitoramentoAtual } from './../../redux/reducers/monitoramento';
import { Monitoramento } from './../../models/monitoramento';

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})

export class HomePage {
  public tipo = 'Home'
  public monitoramento$: Observable<Monitoramento>;

    constructor(public store: Store<AppState>) {
      this.monitoramento$ = this.store.select(getMonitoramentoAtual)
    }
}
