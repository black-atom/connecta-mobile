import { selectAtendiementosDeHoje, selectAtendimentosConcluidos, selectPromixosAtendimentos } from './../../redux/reducers/atendimentos';
import { Atendimento } from '../../models/atendimento';
import { KmInicialComponent } from './components/km-inicial.component';
import { RETRIEVE_ATENDIMENTOS } from './../../redux/actions/atendimentos';
import { AppState } from './../../redux/reducers/index';
import { Observable, Subject } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { getMonitoramentoAtual } from './../../redux/reducers/monitoramento';
import { Monitoramento } from './../../models/monitoramento';
import {
    App,
    IonicPage,
    ModalController,
    NavController,
} from 'ionic-angular';
import { Store } from "@ngrx/store";

/**
 * Generated class for the ChamadosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-chamados",
  templateUrl: "chamados.html"
})
export class ChamadosPage {
  selectedSegment = "hoje";
  public monitoramento$: Observable<Monitoramento>;
  public changeAtendimentos$: Subject<string> = new Subject<string>();
  atendimentos$: Observable<Atendimento[]>;

  constructor(
    public app: App,
    public navCtrl: NavController,
    private store: Store<AppState>,
    private modalCtrl: ModalController
   ) {
    this.monitoramento$ = this.store.select(getMonitoramentoAtual)
  }

  ionViewDidLoad() {

    this.atendimentos$ = this.changeAtendimentos$
    .switchMap( selectTab => {

        switch(selectTab){
          case 'hoje':
            return this.store.select(selectAtendiementosDeHoje)
          case 'concluidos':
            return this.store.select(selectAtendimentosConcluidos)
          case 'proximos':
            return this.store.select(selectPromixosAtendimentos)
          default:
            return this.store.select(selectAtendiementosDeHoje)
        }
    })

    setTimeout(() =>{
      this.store.dispatch({ type: RETRIEVE_ATENDIMENTOS });
      this.changeAtendimentos$.next('1');
    }, 500);

    setInterval(() =>{
      this.store.dispatch({ type: RETRIEVE_ATENDIMENTOS });
      this.changeAtendimentos$.next('1');
    }, 60000)//300000)
  }

  changeSegment(){
    this.changeAtendimentos$.next(this.selectedSegment);
  }

  iniciarAtendimento(id){
    const modal = this.modalCtrl.create(KmInicialComponent, { id });
    modal.present();
    modal.onDidDismiss((data) =>{
      console.log(data);
    })
  }

  openDetailsPage( id ){
    //this.app.getRootNavs()[0].setRoot("DetailsPage", { id })
    this.navCtrl.push("DetailsPage", { id });
  }
}
