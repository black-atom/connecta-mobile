import { AppState } from './../../../../redux/reducers/index';
import { Assinatura } from './../../../../models/atendimento';
import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { DetailsPage } from '../../details';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddAssinatura } from '../../../../redux/reducers/assinatura';

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

  constructor(
    public navCtrl: NavController,
    private view: ViewController,
    private fb: FormBuilder,
    public navParams: NavParams,
    public store: Store<AppState>
  ) {
    this.atendimentoID = navParams.get("id");
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
