import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlmocoPage } from './almoco';
import { ComponentsModule } from '../../components/components'

@NgModule({
  declarations: [
    AlmocoPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AlmocoPage)
  ],
  entryComponents: [
    AlmocoPage
  ]
})

export class AlmocoModule{}
