import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalInteracaoPage } from './modal-interacao';

@NgModule({
  declarations: [
    ModalInteracaoPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalInteracaoPage),
  ],
  exports: [
    ModalInteracaoPage
  ]
})
export class ModalInteracaoPageModule {}
