import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the ModalInteracaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-interacao',
  templateUrl: 'modal-interacao.html'
})
export class ModalInteracaoPage {
  public validacaoCampo = {
    mesmoRelogio: true,
    houveRemocao: false,
    retornarLocal: true,
    houveTreinamento: false,
    mesmoCnpj: true
  };

  public interacaoTecnicoForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private view: ViewController,
    private fb: FormBuilder
  ) {
    this.interacaoTecnicoForm = this.fb.group({
      retorno: this.fb.group({
        retornar: [ false ],
        motivo: ["", Validators.required]
      }),
      treinamento: this.fb.group({
        treinamento: [ false ],
        cadastros: [ false ],
        interrupcoes: [ false ],
        relatorios: [ false ],
        importacao_dados: [ false ],
        parametros_gerais: [ false ],
        abonos_justificativas: [ false ],
        backup_sistema: [ false ],
        software: ["", Validators.required],
        caminho: ["", Validators.required]
      }),
      retirou_equipamento: this.fb.group({
        retirado: [ false ],
        mesmo_equipamento: [ false ],
        outro_equipamento: [ false ],
      })
    });
  }

  fecharModal() {
    this.view.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalInteracaoPage');
  }

  logForm() {
    console.log(this.interacaoTecnicoForm.value);
  }
}
