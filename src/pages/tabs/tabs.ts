import { App, NavController } from 'ionic-angular';
import { LoginActions } from '../login/redux/login.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../redux/reducers';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  //lazy loading of the pages
  tab1Root = 'ChamadosPage';

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

}
