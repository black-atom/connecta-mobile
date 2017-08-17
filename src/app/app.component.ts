import { SAVE_STATE_DB, SaveStateDB } from './redux/actions/persistStateActions';
import { NETWORK_CONNECTED, NETWORK_DISCONNETED } from './redux/actions/networkActions';
import { AppState } from './redux/reducers';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { TabsPage } from '../pages/tabs/tabs';

import 'rxjs/add/operator/switchMap';


@Component({
  templateUrl: "app.html"
})
export class MyApp implements OnInit {

  rootPage: any = TabsPage;

  constructor(
    platform: Platform,
    private networdk: Network,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    menu: MenuController,
    private network: Network,
    private store: Store<AppState>
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    menu.enable(true);

  }

  ngOnInit(): void {
    this.networdk.onConnect().subscribe(conected => this.store.dispatch({type: NETWORK_CONNECTED}));
    this.networdk.onDisconnect()
    .do(() => this.store.dispatch({type: NETWORK_DISCONNETED}))
    .switchMap(()=> this.store.take(1))
    .subscribe((state: AppState) => this.store.dispatch(new SaveStateDB(state)))
  }
}
