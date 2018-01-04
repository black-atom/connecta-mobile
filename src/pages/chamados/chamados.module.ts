import { KmInicialComponent } from './components/km-inicial.component';
import { ChamadosPage } from './chamados';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../components/components'
import {File} from "@ionic-native/file";


@NgModule({
  declarations: [
    ChamadosPage,
    KmInicialComponent
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ChamadosPage),
  ],
  providers:[
    File
  ],
  entryComponents: [
    KmInicialComponent,
    ChamadosPage
  ]
})
export class ChamadosModule{}
