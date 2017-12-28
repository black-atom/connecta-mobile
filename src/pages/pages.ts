import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AlmocoModule } from './almoco/almoco.module';
import { ChamadosModule } from './chamados/chamados.module';
import { DetailsModule } from './details/details.module';
import { LoginModule } from './login/login.module';
import { ModalInteracaoPageModule } from './modal-interacao/modal-interacao.module';
import { AbastecimentoModule } from './abastecimento/abastecimento.module';
import { HomeModule } from './home/home.module';
import { OutrosModule } from './outros/outros.module';

@NgModule({
  imports:[
    ChamadosModule,
    AlmocoModule,
    AbastecimentoModule,
    HomeModule,
    OutrosModule,
    LoginModule,
    DetailsModule,
    ReactiveFormsModule,
    ModalInteracaoPageModule
  ]
})
export class PagesModule{}
