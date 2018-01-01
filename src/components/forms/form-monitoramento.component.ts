import { ViewController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Component, OnInit, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core/src/metadata/view';
import { AppState } from '../../redux/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { Monitoramento } from '../../models/monitoramento';
import { inserirKMInicial, updateKMInicial, inserirKMFinal, updateKMFinal } from '../../redux/reducers/monitoramento';

@Component({
  templateUrl: 'form-monitoramento.html',
  selector: 'form-monitoramento'
})
export class FormMonitoramentoComponent implements OnInit {


  @Input('tipo') tipo: string;
  @Input('monitoramento') monitoramento: Monitoramento;
  private selectedId = null;

  get canShowInicio(){
    return this.monitoramento !==null
  }

  get canShow(){
    return this.monitoramento && this.monitoramento.tipo_quilometragem === this.tipo
  }

  constructor(
              public alertCtrl: AlertController,
              public navParams: NavParams,
              private store: Store<AppState>
            ) {
  }

  public iconDefault = 'assets/icon/speed.png';

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

  iconPath() {
    const icons = {

    }
    return icons[this.tipo];
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

  showPrompt(tipo) {
    let prompt = this.alertCtrl.create({
      title: `Quilometragem ${tipo}.`,
      message: this.message,
      inputs: [
        {
          name: 'km',
          placeholder: `Insira KM ${tipo}.`
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
           if(tipo === 'inicial') {
            if(this.monitoramento && this.monitoramento.km_inicial === null) {
              this.store.dispatch(new inserirKMInicial(KM, this.tipo))
            }else {
              this.store.dispatch(new updateKMInicial(KM, this.monitoramento.uuid))
            }
           }else if(tipo === 'final') {
            if(this.monitoramento && this.monitoramento.km_final === null) {
              this.store.dispatch(new inserirKMFinal(KM, this.monitoramento.uuid))
            }else {
              this.store.dispatch(new updateKMFinal(KM, this.monitoramento.uuid))
            }
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
