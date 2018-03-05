import { AppState } from './../../../../redux/reducers/index';
import { Assinatura } from './../../../../models/atendimento';
import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController, NavParams, ToastController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { DetailsPage } from '../../details';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddAssinatura } from '../../../../redux/reducers/assinatura';
import { FimAtendimento } from './../../../../redux/actions/atendimentos';
import { finalizarMonitoramento } from '../../../../redux/reducers/monitoramento';

@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html'
})
export class SignaturePage {

  @ViewChild(SignaturePad) public signaturePad : SignaturePad;

  public signaturePadOptions : Object = {
    'minWidth': 2,
    'canvasWidth': 400,
    'canvasHeight': 200

  };
  public responsavelForm: FormGroup;
  private atendimentoID: string;
  public monitoramentoAtendimento

  constructor(
    public navCtrl: NavController,
    private view: ViewController,
    private fb: FormBuilder,
    public navParams: NavParams,
    private readonly toastCtrl: ToastController,
    public store: Store<AppState>
  ) {
    this.atendimentoID = navParams.get("id");
    this.monitoramentoAtendimentoAtual();
    this.initiaForm();
  }

  initiaForm() {
    this.responsavelForm = this.fb.group({
      nome: [ '', Validators.required ],
      documento_id: [ '', Validators.required ]
    })
  }
  salvarDados(dados) {
    const assinaturaBase64 = this.signaturePad.toDataURL().replace(/^data:image\/png;base64,/,"");
    const assinatura: Assinatura = {
      ...dados,
      assinaturaBase64,
      atendimentoID: this.atendimentoID,
    }

    this.store.dispatch(new AddAssinatura(assinatura))
    this.store.dispatch(new FimAtendimento({_id: this.atendimentoID}));  
    this.store.dispatch(new finalizarMonitoramento(this.monitoramentoAtendimento, this.monitoramentoAtendimento.uuid));      
    this.presentToast()
    this.view.dismiss();
  };

  canvasResize() {
    let canvas = document.querySelector('canvas');
    this
      .signaturePad
      .set('minWidth', 1);

    this
      .signaturePad
      .set('canvasWidth', canvas.offsetWidth);

    this
      .signaturePad
      .set('canvasHeight', canvas.offsetHeight);
  }

  monitoramentoAtendimentoAtual() {
    this.store.select(appState => appState.monitoramentos)
    .map(monitoramentos => monitoramentos
      .filter(monitoramento => monitoramento.id_atendimento === this.atendimentoID))
      .filter(monitoramentos => monitoramentos.length > 0)
      .map(monitoramentos => monitoramentos[0])
      .subscribe(res => this.monitoramentoAtendimento = res);
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Salvo com sucesso!',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

   ngAfterViewInit() {
      this
      .signaturePad
      .clear();
      this.canvasResize();
   }

   cancelar() {
    this.view.dismiss();
  }

  limpar() {
    this.signaturePad.clear();
  }


}
