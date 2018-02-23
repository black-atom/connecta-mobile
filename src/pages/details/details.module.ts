import { DetailsPage } from './details';
import { SignaturePage } from './components/signature/signature';
import { SignaturePadModule } from 'angular2-signaturepad';

import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { File } from "@ionic-native/file";


@NgModule({
  declarations: [
    DetailsPage,
    SignaturePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsPage),
    SignaturePadModule
  ],
  providers:[
    File
  ],
  entryComponents: [
    DetailsPage,
    SignaturePage
  ]
})
export class DetailsModule{}
