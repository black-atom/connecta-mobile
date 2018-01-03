import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { OutrosPage } from './outros';
import { ComponentsModule } from '../../components/components'

@NgModule({
  declarations: [
    OutrosPage
  ],
  imports:[
    ComponentsModule,
    IonicPageModule.forChild(OutrosPage)
  ],
  entryComponents:[
    OutrosPage
  ]
})

export class OutrosModule{}

