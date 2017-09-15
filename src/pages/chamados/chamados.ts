import { Atendimento, Endereco } from '../../models/atendimento';
import { KmInicialComponent } from './components/km-inicial.component';
import { RETRIEVE_ATENDIMENTOS } from './../../redux/actions/atendimentos';
import { AppState } from './../../redux/reducers/index';
import { Observable, Subject } from 'rxjs/Rx';
import { PesquisaPage } from '../pesquisa/pesquisa';
import { Component } from '@angular/core';
import {
    App,
    IonicPage,
    ModalController,
    NavController,
    NavParams,
} from 'ionic-angular';
import { Store } from "@ngrx/store";
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';




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
  selectedSegment = "1";

  public changeAtendimentos$: Subject<string> = new Subject<string>();

  counter: Observable<number>;
  atendimentos$: Observable<Atendimento[]>;

  constructor(
    public app: App,
    public navCtrl: NavController,
    private store: Store<AppState>,
    private modalCtrl: ModalController,
    private launchNavigator: LaunchNavigator,
  ) {
  }

  ionViewDidLoad() {
    this.atendimentos$ = this.changeAtendimentos$
    .switchMap( option =>
      this.store.select(appstate => appstate.atendimentos)
      .map(atendimentos => {
        return atendimentos.filter(atendimento => {
          if(option==='2' && atendimento.estado.indexOf('fim_do_atendimento')>-1){
            return true;
          }else if(option==='1' && atendimento.estado.indexOf('fim_do_atendimento')==-1){
            return true;
          }else{
            return false;
          }
        })
      })
    )
    setTimeout(() =>{
      this.store.dispatch({ type: RETRIEVE_ATENDIMENTOS });
      this.changeAtendimentos$.next('1');
    }, 500
    );
  }

  changeSegment(){
    this.changeAtendimentos$.next(this.selectedSegment);
  }

  finalizarChamado(_id: number) {
    //this.navCtrl.push(PesquisaPage);
    //this.navCtrl.setRoot(PesquisaPage);
    //this.app.getRootNav().setRoot(PesquisaPage);
    this.app.getRootNavs()[0].setRoot(PesquisaPage);
    //this.app.getRootNavById()
    //this.navCtrl.parent.setRoot(PesquisaPage);
    //this.navCtrl.goToRoot()
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

  openGPS(endereco: Endereco){

    this.launchNavigator.navigate(`${endereco.numero} ${endereco.rua},${endereco.bairro},${endereco.cidade}`, {
    });

  }
}
