import { DetailsPage } from './details';
import { SignaturePage } from './components/signature/signature';
import { SignaturePadModule } from 'angular2-signaturepad';

import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { File } from "@ionic-native/file";

import { CnpjCpfPipe } from '../../shared';

@NgModule({
  declarations: [
    DetailsPage,
    SignaturePage,
    CnpjCpfPipe,
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
