import { getFuncionario } from './../login/redux/login.reducer';
import { AppState } from './../../redux/reducers/index';
import {
  getMonitoramentoAtual,
  inserirKMInicial,
  updateKMInicial,
  inserirKMFinal,
  updateKMFinal,
  iniciarMonitoramento,
  finalizarMonitoramento,
} from './../../redux/reducers/monitoramento';
import { ModalInteracaoPage } from './../modal-interacao/modal-interacao';
import { AddImagem } from '../../redux/actions/imagem.actions';
import { Imagem } from '../../models/imagem';
import { EmDeslocamento, ChegouAoDestino, EditarAtendimento, IniciarAtendimento, FimAtendimento } from './../../redux/actions/atendimentos';
import { Camera } from '@ionic-native/camera';
import { PesquisaPage } from './../pesquisa/pesquisa';
import { INICIAR_ATENDIMENTO } from '../../redux/actions/atendimentos';
import { Atendimento, Endereco } from './../../models/atendimento';
import { Funcionario } from './../../models/funcionario';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import {
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  NavParams,
  ToastController,
  AlertController,
  ActionSheetController,
  ModalController} from 'ionic-angular';
import { File, FileEntry} from "@ionic-native/file";
import { Response} from "@angular/http";
import { AuthHttp } from 'angular2-jwt';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Monitoramento } from '../../models/monitoramento';


@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  private selectedId = null;
  public atendimento$: Observable<Atendimento>;

  public myPhoto: any;
  public myPhotoURL: any;
  public error: string;
  private loading: Loading;
  private funcionario: Funcionario;
  public monitoramento: Monitoramento;
  public tipo = 'atendimento';

  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private store: Store<AppState>,
    private readonly camera: Camera,
    private readonly toastCtrl: ToastController,
    private readonly loadingCtrl: LoadingController,
    private readonly file: File,
    private readonly authHttp: AuthHttp,
    private launchNavigator: LaunchNavigator,
    public actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController
  ) {
    this.store.select(getFuncionario).subscribe(funcionario => this.funcionario = funcionario);
    this.store.select(getMonitoramentoAtual).subscribe(funcionario => this.monitoramento = funcionario);
  }

  ionViewDidLoad() {
    this.selectedId = this.navParams.get('id');
    this.atendimento$ = this.store.select(appState =>
      appState.atendimentos
        .find(atendimento => atendimento._id == this.selectedId)
    );
  }

  mostrarModalInteracaoDados() {
    const modal = this.modalCtrl.create(ModalInteracaoPage, { id: this.selectedId });
    modal.present();
  }

  mostrarConfirmacaoInicioAtendimento(){
    let confirm = this.alertCtrl.create({
      title: 'Confirmação',
      message: `Deseja iniciar o atendimento?`,
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.iniciarMonitoramento()
          }
        }
      ]
    });
    confirm.present();
  }



  mostrarPromptKmInicial() {
    let alert = this.alertCtrl.create({
      title: 'Quilometragem inicial',
      inputs: [
        {
          name: 'km',
          placeholder: 'KM',
          type: 'number',
          value: ""
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=> {
            console.log('Canceled!')
          }
        },
        {
          text: 'Salvar',

          handler: data => {
            const KM = parseInt(data.km);
            if(!this.monitoramento) {
              this.store.dispatch(new inserirKMInicial(KM, this.tipo, this.funcionario._id, this.selectedId))
              this.store.dispatch(new EmDeslocamento({_id:this.selectedId}))
            }else {
              this.store.dispatch(new updateKMInicial(this.monitoramento, KM, this.monitoramento.uuid))
            }
          }

        }
      ]
    });
    alert.present();
  }

  iniciarMonitoramento() {
    this.store.dispatch(new iniciarMonitoramento(this.monitoramento));
    this.store.dispatch(new IniciarAtendimento({_id: this.selectedId}));
  }

  finalizarMonitoramento() {
    this.store.dispatch(new finalizarMonitoramento(this.monitoramento, this.monitoramento.uuid));
    this.store.dispatch(new FimAtendimento({_id: this.selectedId}));
  }

  mostrarPromptKmFinal() {
    let alert = this.alertCtrl.create({
      title: 'Quilometragem final',
      inputs: [
        {
          name: 'km',
          placeholder: 'KM',
          type: 'number',
          value: ""
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=> {
            console.log('Canceled!')
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            const KM = parseInt(data.km);
            if(this.monitoramento && this.monitoramento.km_final === null) {
              this.store.dispatch(new inserirKMFinal(this.monitoramento,KM, this.monitoramento.uuid));
              this.store.dispatch(new ChegouAoDestino({_id:this.selectedId }))
            }else {
              this.store.dispatch(new updateKMFinal(this.monitoramento,KM, this.monitoramento.uuid))
            }
          }
        }
      ]
    });
    alert.present();
  }


  mostrarOpcoesParaTirarFoto() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Escolha a opção de captura de foto',
      enableBackdropDismiss: true,
      cssClass: 'action-sheet',
      buttons: [
        {
          text: 'Início do atendimento',
          icon: 'camera',
          cssClass: 'inicio',
          role: 'destructive',
          handler: () => {
            this.takePhoto("inicio_atendimento");
          }
        },
        {
          text: 'Final do atendimento',
          icon: 'camera',
          cssClass: 'fim',
          handler: () => {
            this.takePhoto("fim_atendimento");
          }
        },

      ],
    });
    actionSheet.present();
  }

  takePhoto(tipo: string) {
    this.camera
      .getPicture({
        quality: 1,
        destinationType: this.camera.DestinationType.NATIVE_URI,
        sourceType: this.camera.PictureSourceType.CAMERA,
        encodingType: this.camera.EncodingType.PNG,
        saveToPhotoAlbum: true,
        targetWidth:1024,
        targetHeight: 860
      })
      .then(
        imagemPath => {
          const imagem: Imagem = {
            atendimentoID: this.selectedId,
            isUploaded: false,
            isUploading: false,
            localPath: imagemPath,
            tipo: tipo
          };
          this.store.dispatch(new AddImagem(imagem));
        },
        error => {
          this.error = JSON.stringify(error);
        }
      );
  }
  private uploadPhoto(imageFileUri: any): void {
    this.error = null;
    this.loading = this.loadingCtrl.create({
      content: 'Enviando...'
    });

    this.loading.present();

    this.file.resolveLocalFilesystemUrl(imageFileUri)
      .then(entry => (<FileEntry>entry).file(file => this.readFile(file)))
      .catch(err => console.log(err));
  }

  private readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {type: file.type});
      formData.append('file', imgBlob, file.name);
      formData.append("chamado", "1223");
      this.enviarFoto(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  private enviarFoto(formData: FormData) {
    this.authHttp.post(`http://165.227.78.113:3000/api/atendimentos/${this.selectedId}/imagens`, formData)
      .catch((e) => this.handleError(e))
      .map(response => response.text())
      .finally(() => this.loading.dismiss())
      .subscribe(ok => this.notificarUsuario(ok));
  }

  private notificarUsuario(ok: boolean) {
    if (ok) {
      const toast = this.toastCtrl.create({
        message: 'Upload realizado com sucesso',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else {
      const toast = this.toastCtrl.create({
        message: 'Falha no upload da imagem!',
        duration: 2500,
        position: 'top'
      });
      toast.present();
    }
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    this.error = errMsg;
    return Observable.throw(errMsg);
  }

  mostrarConfirmacaoFimAtendimento(){
    let confirm = this.alertCtrl.create({
      title: 'Confirmação',
      message: `Deseja finalizar o atendimento?`,
      buttons: [
        {
          text: 'Não',
          handler: () => {
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.presentToast()
            this.finalizarMonitoramento()
          }
        }
      ]
    });
    confirm.present();
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

  openGPS(endereco: Endereco){

     this.launchNavigator.navigate(`${endereco.numero} ${endereco.rua},${endereco.bairro},${endereco.cidade}`, {
    });
  }
}
