import { ModalInteracaoPage } from './../modal-interacao/modal-interacao';
import { AddImagem } from '../../redux/actions/imagem.actions';
import { Imagem } from '../../models/imagem';
import { EmDeslocamento, ChegouAoDestino } from './../../redux/actions/atendimentos';
import { Camera } from '@ionic-native/camera';
import { PesquisaPage } from './../pesquisa/pesquisa';
import { INICIAR_ATENDIMENTO } from '../../redux/actions/atendimentos';
import { Atendimento, Endereco } from './../../models/atendimento';
import { Observable } from 'rxjs/Rx';
import { AppState } from '../../redux/reducers';
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

  iniciarAtendimento(){
    this.store.dispatch({
      type: INICIAR_ATENDIMENTO,
      payload: {
        _id: this.selectedId
      }
    })
  }

  mostrarConfirmacaoInicioAtendimento(km: number){
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
            this.iniciarAtendimento();
          }
        }
      ]
    });
    confirm.present();
  }

  mostrarPromptKmInicial(km: number) {
    let alert = this.alertCtrl.create({
      title: 'Quilometragem inicial',
      inputs: [
        {
          name: 'km',
          placeholder: 'KM',
          type: 'number',
          value: "" + km
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
          handler: (input) => {
            if(input.km){
              this.store.dispatch(new EmDeslocamento({
                _id: this.selectedId,
                km_inicial: {
                  km: input.km,
                  data: new Date()
                }
              }))
            }
          }
        }
      ]
    });
    alert.present();
  }


  mostrarPromptKmFinal(km: number) {
    let alert = this.alertCtrl.create({
      title: 'Quilometragem final',
      inputs: [
        {
          name: 'km',
          placeholder: 'KM',
          type: 'number',
          value: "" + km
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
          handler: (input) => {
            if(input.km){
              this.store.dispatch(new ChegouAoDestino({
                _id: this.selectedId,
                km_final: {
                  km: input.km,
                  data: new Date()
                }
              }))
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

  finalizarAtendimento(){
    this.navCtrl.push(PesquisaPage,{_id: this.selectedId});
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
            this.finalizarAtendimento();
          }
        }
      ]
    });
    confirm.present();
  }

  openGPS(endereco: Endereco){

     this.launchNavigator.navigate(`${endereco.numero} ${endereco.rua},${endereco.bairro},${endereco.cidade}`, {
    });
  }
}
