import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormMonitoramentoComponent } from './forms/form-monitoramento.component'
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports:[
    ReactiveFormsModule,
    IonicPageModule
  ],
  declarations: [
    FormMonitoramentoComponent,
    HeaderComponent
  ],
  exports: [
    FormMonitoramentoComponent,
    HeaderComponent
  ]
})
export class ComponentsModule{}
