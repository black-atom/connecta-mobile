import { ReactiveFormsModule } from '@angular/forms';
import { ModalInteracaoPageModule } from './modal-interacao/modal-interacao.module';
import { DetailsModule } from './details/details.module';
import { LoginModule } from './login/login.module';
import { ChamadosModule } from './chamados/chamados.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports:[
    ChamadosModule,
    LoginModule,
    DetailsModule,
    ReactiveFormsModule,
    ModalInteracaoPageModule
  ]
})
export class PagesModule{}
