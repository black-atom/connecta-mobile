import { ChamadosPage } from './chamados';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

NgModule({
  declarations: [
    ChamadosPage
  ],
  imports: [
    IonicPageModule.forChild(ChamadosPage)
  ],
  entryComponents: [
    ChamadosPage
  ]
})
export class ChamadosModule{}
