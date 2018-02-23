import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { DetailsPage } from '../../details';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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
  public signatureImage : string;
  public responsavelForm: FormGroup;

  constructor(public navCtrl: NavController, private view: ViewController, private fb: FormBuilder) {
    this.initiaForm();
  }

  initiaForm() {
    this.responsavelForm = this.fb.group({
      nome: [ '', Validators.required ],
      sobrenome: [ '', Validators.required ],
      rg: [ '', Validators.required ]
    })
  }
  salvarDados(dados) {
    this.signatureImage = this.signaturePad.toDataURL();
    const dataFormAndSignature = { assinatura: this.signatureImage, ...dados };
    console.log(dataFormAndSignature);
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
