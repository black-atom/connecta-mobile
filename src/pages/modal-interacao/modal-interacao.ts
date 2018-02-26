import { EditarAtendimento } from './../../redux/actions/atendimentos';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Atendimento } from './../../models/atendimento';
import { Observable } from 'rxjs/Rx';
import { AppState } from '../../redux/reducers';
import { Store } from '@ngrx/store';

@IonicPage()
@Component({
  selector: 'page-modal-interacao',
  templateUrl: 'modal-interacao.html'
})
export class ModalInteracaoPage {
  public validacaoCampo = {
    mesmoRelogio: false,
    houveRemocao: false,
    retornarLocal: false,
    houveTreinamento: false,
    mesmoCnpj: true
  };
  private AtendimentoID;
  public atendimento$: Observable<Atendimento>;
  public interacaoTecnicoForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private view: ViewController,
    private fb: FormBuilder,
    public platform: Platform,
    private store: Store<AppState>,
  ) {
    this.iniciarFormulario();
  }

  ionViewDidLoad() {
    this.AtendimentoID  = this.navParams.get('id');
    this.atendimento$ = this.store.select(appState =>
      appState.atendimentos
        .find(atendimento => atendimento._id == this.AtendimentoID)
    );
  }

  iniciarFormulario() {
    this.interacaoTecnicoForm = this.fb.group({
      retorno: this.fb.group({
        retornar: [ false, Validators.required ],
        motivo: [{ value: '', disabled: true}, Validators.required]
      }),
      relatorio_tecnico: ['', Validators.required],
      treinamento: this.fb.group({
        treinamento: [ false, Validators.required ],
        cadastros: [{ value: false, disabled: true }],
        interrupcoes: [{ value: false, disabled: true }],
        relatorios: [{ value: false, disabled: true }],
        importacao_dados: [{ value: false, disabled: true }],
        parametros_gerais: [{ value: false, disabled: true }],
        abonos_justificativas: [{ value: false, disabled: true }],
        backup_sistema: [{ value: false, disabled: true }],
        software: [{ value: '', disabled: true }, Validators.required],
        caminho: [{ value: '', disabled: true }],
      }),
      retirou_equipamento: this.fb.group({
        retirado: [ false, Validators.required ],
        mesmo_equipamento:  [{ value: true, disabled: true }, Validators.required ],
        informacoe_equipamento: [{ value: '', disabled: true }, Validators.required ],
      }),
      faturamento: this.fb.group({
        mesmo_cnpj: [ true, Validators.required ],
        cnpj: [{ value: '', disabled: true }, Validators.required ],
        nome_razao_social: [{ value: '', disabled: true }, Validators.required ],
        email: [{ value: '', disabled: true }, Validators.required ],
        quem_aprovou: [{ value: '', disabled: true }, Validators.required ],
        valor: [{ value: '', disabled: true }, Validators.required ],
        prazo_pagamento: [{ value: '', disabled: true} , Validators.required ],
      })
    });
  }

  retorno(value) {
    value === true ? this.interacaoTecnicoForm.get('retorno.motivo').enable() : this.interacaoTecnicoForm.get('retorno.motivo').disable();
  }

  treinamento(value) {
   if( value === true) {
    this.interacaoTecnicoForm.get('treinamento.cadastros').enable();
    this.interacaoTecnicoForm.get('treinamento.interrupcoes').enable();
    this.interacaoTecnicoForm.get('treinamento.relatorios').enable();
    this.interacaoTecnicoForm.get('treinamento.importacao_dados').enable();
    this.interacaoTecnicoForm.get('treinamento.parametros_gerais').enable();
    this.interacaoTecnicoForm.get('treinamento.abonos_justificativas').enable();
    this.interacaoTecnicoForm.get('treinamento.backup_sistema').enable();
    this.interacaoTecnicoForm.get('treinamento.software').enable();
    this.interacaoTecnicoForm.get('treinamento.caminho').enable();
   }else {
    this.interacaoTecnicoForm.get('treinamento.cadastros').disable();
    this.interacaoTecnicoForm.get('treinamento.interrupcoes').disable();
    this.interacaoTecnicoForm.get('treinamento.relatorios').disable();
    this.interacaoTecnicoForm.get('treinamento.importacao_dados').disable();
    this.interacaoTecnicoForm.get('treinamento.parametros_gerais').disable();
    this.interacaoTecnicoForm.get('treinamento.abonos_justificativas').disable();
    this.interacaoTecnicoForm.get('treinamento.backup_sistema').disable();
    this.interacaoTecnicoForm.get('treinamento.software').disable();
    this.interacaoTecnicoForm.get('treinamento.caminho').disable();
   }
  }

  retiradaEquipamento(value) {
    if( value === true) {
      this.interacaoTecnicoForm.get('retirou_equipamento.mesmo_equipamento').enable();
      this.interacaoTecnicoForm.get('retirou_equipamento.informacoe_equipamento').enable();
    }else{
      this.interacaoTecnicoForm.get('retirou_equipamento.mesmo_equipamento').disable();
      this.interacaoTecnicoForm.get('retirou_equipamento.informacoe_equipamento').disable();
    }
  }
  faturamento(value) {
    if( value === true ) {
      this.interacaoTecnicoForm.get('faturamento.cnpj').disable();
      this.interacaoTecnicoForm.get('faturamento.nome_razao_social').disable();
      this.interacaoTecnicoForm.get('faturamento.email').disable();
      this.interacaoTecnicoForm.get('faturamento.quem_aprovou').disable();
      this.interacaoTecnicoForm.get('faturamento.valor').disable();
      this.interacaoTecnicoForm.get('faturamento.prazo_pagamento').disable();
    }else {
      this.interacaoTecnicoForm.get('faturamento.cnpj').enable();
      this.interacaoTecnicoForm.get('faturamento.nome_razao_social').enable();
      this.interacaoTecnicoForm.get('faturamento.email').enable();
      this.interacaoTecnicoForm.get('faturamento.quem_aprovou').enable();
      this.interacaoTecnicoForm.get('faturamento.valor').enable();
      this.interacaoTecnicoForm.get('faturamento.prazo_pagamento').enable();
    }
  }

  salvarDados(dados) {
    this.store.dispatch(new EditarAtendimento({
      _id: this.AtendimentoID,
      interacao_tecnico: {
        relatorio_tecnico: {
          relatorio: dados.relatorio_tecnico
        },
        retorno: dados.retorno,
        treinamento: dados.treinamento,
        faturamento: dados.faturamento,
        retirou_equipamento: dados.retirou_equipamento
      }
    }));
    this.fecharModal();
  }

  fecharModal() {
    this.view.dismiss();
  }
}
