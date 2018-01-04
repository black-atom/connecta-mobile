import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { ComponentsModule } from '../../components/components'

@NgModule({
  declarations: [
    HomePage
  ],
  imports:[
    ComponentsModule,
    IonicPageModule.forChild(HomePage)
  ],
  entryComponents:[
    HomePage
  ]
})

export class HomeModule{}

