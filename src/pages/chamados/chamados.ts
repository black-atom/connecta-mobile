import { RETRIEVE_ATENDIMENTOS } from './../../redux/actions/atendimentos';
import { AppState } from './../../redux/reducers/index';
import { Observable } from 'rxjs/Rx';
import { Camera } from '@ionic-native/camera';
import { PesquisaPage } from '../pesquisa/pesquisa';
import { SocketIoProvider } from './../../providers/socket-io/socket-io';
import { Component } from '@angular/core';
import { App, IonicPage, Loading, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Store } from "@ngrx/store";
import {Http, Response} from "@angular/http";
import {File, FileEntry} from "@ionic-native/file";



/**
 * Generated class for the ChamadosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-chamados",
  templateUrl: "chamados.html"
})
export class ChamadosPage {
  selectedSegment = "1";

  public myPhoto: any;
  public myPhotoURL: any;
  public error: string;
  private loading: Loading;

  counter: Observable<number>;
  atendimentos$: Observable<any[]>;

  constructor(
    public app: App,
    private readonly http: Http,
    private readonly file: File,
    public navCtrl: NavController,
    private readonly camera: Camera,
    private store: Store<AppState>,
    private socketIoProvider: SocketIoProvider,
    private readonly toastCtrl: ToastController,
    private readonly loadingCtrl: LoadingController,
  ) {
    this.counter = store.select("counter");
    this.atendimentos$ = store.select("atendimentos");
    this.socketIoProvider.getChamados().subscribe(data => console.log("oi"));
  }

  ionViewDidLoad() {
    setTimeout(() => this.store.dispatch({ type: RETRIEVE_ATENDIMENTOS }), 500);
    console.log("ionViewDidLoad ChamadosPage");
  }

  finalizarChamado(_id: number) {
    //this.navCtrl.push(PesquisaPage);
    //this.navCtrl.setRoot(PesquisaPage);
    //this.app.getRootNav().setRoot(PesquisaPage);
    this.app.getRootNavs()[0].setRoot(PesquisaPage);
    //this.app.getRootNavById()
    //this.navCtrl.parent.setRoot(PesquisaPage);
    //this.navCtrl.goToRoot()
  }

  takePhoto() {
    this.camera
      .getPicture({
        quality: 1,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.CAMERA,
        encodingType: this.camera.EncodingType.PNG,
        saveToPhotoAlbum: true,
        targetWidth:1024,
        targetHeight: 860
      })
      .then(
        imageData => {
          this.myPhoto = imageData.length;
          this.uploadPhoto(imageData);
          console.log(imageData);
        },
        error => {
          this.error = JSON.stringify(error);
        }
      );
  }

  private uploadPhoto(imageFileUri: any): void {
    this.error = null;
    this.loading = this.loadingCtrl.create({
      content: 'Uploading...'
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
    this.http.post("http://192.168.43.158:5000/upload", formData)
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
}
