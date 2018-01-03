import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AbastecimentoPage } from './abastecimento';
import { ComponentsModule } from '../../components/components'


@NgModule({
  declarations: [
    AbastecimentoPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AbastecimentoPage)
  ],
  entryComponents: [
    AbastecimentoPage
  ]
})

export class AbastecimentoModule{}
