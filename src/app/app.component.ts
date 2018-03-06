import { Observable } from 'rxjs/Rx';
import { SyncAtendimentos } from './../redux/actions/atendimentos';
import { AppState } from './../redux/reducers/index';
import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import 'rxjs/add/operator/switchMap';

@Component({
  templateUrl: "app.html"
})
export class MyApp implements OnInit, OnDestroy {

  rootPage: any = "LoginPage";

  constructor(
    private platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    menu: MenuController,
    private store: Store<AppState>
  ) {
    platform.ready().then(() => {
      statusBar.backgroundColorByHexString("#246af9"); // change color    
      splashScreen.hide();
    });

    menu.enable(true);

  }

  ngOnInit(): void {
    this.store.select(appstate => appstate.imagens)
    .switchMap(imagens => Observable.of(imagens))

    this.store.select(appstate => appstate.atendimentos)
      .map(atendimentos => atendimentos.filter(at => at.synced === false))
      .subscribe(atendimentosNotSynced => {
        if(atendimentosNotSynced.length > 0){
          this.store.dispatch(new SyncAtendimentos(atendimentosNotSynced));
        }
      } );
  }

  ngOnDestroy(): void {

  }
}
