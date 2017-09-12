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
  }
}
