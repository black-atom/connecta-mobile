import { Funcionario } from './../models/funcionario';
import { SaveStateDB } from '../redux/actions/persistStateActions';
import { NETWORK_DISCONNETED } from './../redux/actions/networkActions';
import { NETWORK_CONNECTED } from '../redux/actions/networkActions';
import { AppState } from './../redux/reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { TabsPage } from '../pages/tabs/tabs';

import 'rxjs/add/operator/switchMap';


@Component({
  templateUrl: "app.html"
})
export class MyApp implements OnInit, OnDestroy {

  rootPage: any = "LoginPage";

  constructor(
    private platform: Platform,
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

    this.platform.pause.subscribe(() => {
      // this.store.take(1).
      // this.store.dispatch(new SaveStateDB(state))
    })

    this.networdk
      .onConnect()
      .subscribe(conected => this.store.dispatch({ type: NETWORK_CONNECTED }));
    this.networdk
      .onDisconnect()
      .do(() => this.store.dispatch({ type: NETWORK_DISCONNETED }))
      .switchMap(() => this.store.take(1))
      .subscribe((state: AppState) =>
        this.store.dispatch(new SaveStateDB(state))
      );
  }

  ngOnDestroy(): void {
    console.log("app exiting")
    setTimeout(()=> console.log("dadasdsa"), 3000)
  }
}
