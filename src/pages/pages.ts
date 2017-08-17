import { LoginModule } from './login/login.module';
import { ChamadosModule } from './chamados/chamados.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports:[
    ChamadosModule,
    LoginModule
  ]
})
export class PagesModule{}
