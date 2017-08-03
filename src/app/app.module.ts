import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';


import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { PesquisaPage } from '../pages/pesquisa/pesquisa';
import { ChamadosPage } from './../pages/chamados/chamados';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocketIoProvider } from '../providers/socket-io/socket-io';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ChamadosPage,
    PesquisaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TabsPage,
    ChamadosPage,
    PesquisaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SocketIoProvider,
    Camera
  ]
})
export class AppModule {}
