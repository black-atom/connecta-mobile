import { getFuncionario } from './../../pages/login/redux/login.reducer';
import { Funcionario } from './../../models/funcionario';
import { ViewController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Component, OnInit, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core/src/metadata/view';
import { AppState } from '../../redux/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { Monitoramento } from '../../models/monitoramento';
import { inserirKMInicial,
    updateKMInicial,
    inserirKMFinal,
    updateKMFinal,
    iniciarMonitoramento,
    finalizarMonitoramento
    } from '../../redux/reducers/monitoramento';

@Component({
  templateUrl: 'form-monitoramento.html',
  selector: 'form-monitoramento'
})
export class FormMonitoramentoComponent implements OnInit {


  @Input('tipo') tipo: string;
  @Input('monitoramento') monitoramento: Monitoramento;
  private selectedId = null;
  private funcionario: Funcionario
  get canShowKMInicial(){
    return this.monitoramento  === undefined
  }

  get canShowTipo(){
    return this.monitoramento.tipo === this.tipo
  }

  get canShowKmFinal(){
    return this.monitoramento
      && this.canShowTipo
      && this.monitoramento.km_final === null
      && this.monitoramento.km_inicial
  }

  get canShowIniciar(){
    return this.monitoramento
      && this.canShowTipo
      && this.monitoramento.data_hora_inicial_virgente_local === null
      && this.monitoramento.km_final
  }

  get canShowFinalizar(){
    return this.monitoramento
      && this.canShowTipo
      && this.monitoramento.data_hora_final_virgente_local === null
      && this.monitoramento.data_hora_inicial_virgente_local
  }

  constructor(
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private store: Store<AppState>
  ) {
    this.store.select(getFuncionario).subscribe(funcionario => this.funcionario = funcionario)
  }

  iniciarMonitoramento() {
    this.store.dispatch(new iniciarMonitoramento(this.monitoramento));
  }

  finalizarMonitoramento() {
    this.store.dispatch(new finalizarMonitoramento(this.monitoramento, this.monitoramento.uuid));
  }

  get message(){
    const messagens = {
      almoco:  "Insira a quilometragem inicial do deslocamento para o local do almoço.",
      atendimento:  "Insira a quilometragem inicial do deslocamento para o local do atendimento.",
      deslocamento_empresa: "Insira a quilometragem inicial do deslocamento para empresa.",
      abastecimento: "Insira a quilometragem inicial do deslocamento para o posto de gasolina.",
      outros: "Insira a quilometragem inicial do deslocamento para outras tarefas."
    }
    return messagens[this.tipo]
  }

  imagePath() {
    const imagens = {
      almoco:  "assets/img/background-almoco-1.png",
      atendimento:  "assets/img/background-chamados.svg",
      deslocamento_empresa: "assets/img/background-deslocamento-empresa.png",
      abastecimento: "assets/img/background-abastecimento.png",
      outros: "assets/img/background-almoco.png"
    }
    return  imagens[this.tipo];
  }


  get titleButton(){
    const titles = {
      almoco:  "Iniciar Deslocamento",
      atendimento:  "Iniciar Atendimento",
      deslocamento_empresa: "Ir para Empresa",
      abastecimento: "Insira a quilometragem inicial do deslocamento para o posto de gasolina.",
      outros: "Insira a quilometragem inicial do deslocamento para outras tarefas."
    }
    return titles[this.tipo]
  }

  showPromptKmInicial() {
    let prompt = this.alertCtrl.create({
      title: `Quilometragem Inicial`,
      message: this.message,
      inputs: [
        {
          name: 'km',
          placeholder: `Insira KM Inicial`
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            const KM = parseInt(data.km);
            if(!this.monitoramento) {
              this.store.dispatch(new inserirKMInicial(KM, this.tipo, this.funcionario._id))
            }else {
              this.store.dispatch(new updateKMInicial(this.monitoramento, KM, this.monitoramento.uuid))
            }
          }
        }
      ]
    });
    prompt.present();
  }

  showPromptFinal() {
    let prompt = this.alertCtrl.create({
      title: `Quilometragem Final`,
      message: this.message,
      inputs: [
        {
          name: 'km',
          placeholder: `Insira KM Final`
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            const KM = parseInt(data.km);

            if(this.monitoramento && this.monitoramento.km_final === null) {
              this.store.dispatch(new inserirKMFinal(this.monitoramento,KM, this.monitoramento.uuid))
            }else {
              this.store.dispatch(new updateKMFinal(this.monitoramento,KM, this.monitoramento.uuid))
            }
          }
        }
      ]
    });
    prompt.present();
  }

  ngOnInit() {

  }
}
