import { OutrosPage } from './../outros/outros';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { AppState } from '../../redux/reducers';
import { LoginActions } from '../login/redux/login.actions';
import { Funcionario } from '../../models/funcionario';
import { SocketIoProvider } from './../../providers/socket-io/socket-io';
import { UploadImagem } from './../../redux/actions/imagem.actions';
import { selectImagensToUpload, nImagensParaUploadSelector } from './../../redux/reducers/imagem.reducer';
import { ChamadosPage } from './../chamados/chamados';
import { AlmocoPage } from '../almoco/almoco';
import { AbastecimentoPage } from './../abastecimento/abastecimento';
import { HomePage } from './../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit{
  //lazy loading of the pages
  tab1Root = 'ChamadosPage';
  tab2Root = 'AlmocoPage';
  tab3Root = 'HomePage';
  tab4Root = 'AbastecimentoPage';
  tab5Root = 'OutrosPage';

  funcionario: Funcionario;
  uploadingPhotos: boolean = false;
  nImagensParaUpload$: Observable<number>;

  constructor(
    private store:Store<AppState>,
    private navController:NavController,
    private socketIoProvider: SocketIoProvider,
  ) {

  }

  logout() {
    this.store.dispatch({type: LoginActions.LOGOUT});
    this.navController.pop();
  }

  public ngOnInit(): void {
    this.store.select(state => state.login.funcionario)
    .subscribe(funcionario => this.funcionario = funcionario);

    this.nImagensParaUpload$ = this.store.select(nImagensParaUploadSelector)
    .do((n) => { if(n === 0){this.uploadingPhotos = false} });

    Observable.interval(300000)
    .switchMap(() => this.store.select(selectImagensToUpload).take(1))
    .subscribe(imagens => {
      imagens.forEach(imagem =>{
        this.store.dispatch(new UploadImagem(imagem));
      })
    })
  }
}
