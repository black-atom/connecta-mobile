import { ChamadosPage } from './chamados';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import {File} from "@ionic-native/file";


@NgModule({
  declarations: [
    ChamadosPage
  ],
  imports: [
    IonicPageModule.forChild(ChamadosPage),
  ],
  providers:[
    File
  ],
  entryComponents: [
    ChamadosPage
  ]
})
export class ChamadosModule{}
