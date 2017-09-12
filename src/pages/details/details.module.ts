import { DetailsPage } from './details';

import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import {File} from "@ionic-native/file";


@NgModule({
  declarations: [
    DetailsPage
  ],
  imports: [
    IonicPageModule.forChild(DetailsPage),
  ],
  providers:[
    File
  ],
  entryComponents: [
    DetailsPage
  ]
})
export class DetailsModule{}
