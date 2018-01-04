import { AuthHttp, AuthConfig } from "angular2-jwt";
import { ReduxModule } from './../redux/redux.module';
import { PagesModule } from './../pages/pages';
import { Network } from '@ionic-native/network';

import { HttpModule, Http } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { PesquisaPage } from '../pages/pesquisa/pesquisa';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { SocketIoProvider } from '../providers/socket-io/socket-io';
import { ActionReducer } from '@ngrx/store';

import { SyncDataProvider } from '../providers/sync-data/sync-data';
import { NetwordStatusProvider } from '../providers/netword-status/netword-status';
import { LoginProvider } from '../providers/login/login';
import { AtendimentoProvider } from '../providers/atendimento/atendimento';
import { Storage } from '@ionic/storage';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ImagemProvider } from '../providers/imagem/imagem';
import { MonitoramentoProvider } from '../providers/monitoramento/monitoramento';


// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  }
}

export const metaReducers = [debug];

let storage = new Storage({});

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('token')),
  }), http);
}



@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    PesquisaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsHideOnSubPages:"true"}),
    IonicStorageModule.forRoot(),
    HttpModule,
    ReduxModule,
    PagesModule,
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TabsPage,
    PesquisaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // SocketIoProvider,
    Camera,
    SyncDataProvider,
    NetwordStatusProvider,
    Network,
    LoginProvider,
    LaunchNavigator,
    AtendimentoProvider,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    ImagemProvider,
    MonitoramentoProvider,
  ]
})
export class AppModule {}
