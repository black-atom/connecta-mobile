import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormMonitoramentoComponent } from './forms/form-monitoramento.component'

@NgModule({
  imports:[
    ReactiveFormsModule,
    IonicPageModule
  ],
  declarations: [
    FormMonitoramentoComponent
  ],
  exports: [
    FormMonitoramentoComponent
  ]
})
export class ComponentsModule{}
