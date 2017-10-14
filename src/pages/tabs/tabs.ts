import { Observable } from 'rxjs/Rx';
import { UploadImagem } from './../../redux/actions/imagem.actions';
import { selectImagensToUpload, nImagensParaUploadSelector } from './../../redux/reducers/imagem.reducer';
import { Funcionario } from '../../models/funcionario';
import { App, NavController } from 'ionic-angular';
import { LoginActions } from '../login/redux/login.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../redux/reducers';
import { Component, OnInit, style } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit{
  //lazy loading of the pages
  tab1Root = 'ChamadosPage';
  funcionario: Funcionario;
  uploadingPhotos: boolean = false;
  nImagensParaUpload$: Observable<number>;

  constructor(
    private store:Store<AppState>,
    private navController:NavController,
    private app: App
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

    Observable.interval(60000)
    .switchMap(() => this.store.select(selectImagensToUpload).take(1))
    .subscribe(imagens => {
      imagens.forEach(imagem =>{
        this.store.dispatch(new UploadImagem(imagem));
      })
    })
  }
}
