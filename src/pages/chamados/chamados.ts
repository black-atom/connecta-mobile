import { RETRIEVE_ATENDIMENTOS } from './../../redux/actions/atendimentos';
import { AppState } from './../../redux/reducers/index';
import { Observable } from 'rxjs/Rx';
import { Camera } from '@ionic-native/camera';
import { PesquisaPage } from '../pesquisa/pesquisa';
import { SocketIoProvider } from './../../providers/socket-io/socket-io';
import { Component } from '@angular/core';
import { App, IonicPage, Loading, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Store } from "@ngrx/store";


/**
 * Generated class for the ChamadosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chamados',
  templateUrl: 'chamados.html',
})
export class ChamadosPage {
  selectedSegment = "1";

  public myPhoto: any;
  public myPhotoURL: any;
  public error: string;
  private loading: Loading;

  counter: Observable<number>;
  atendimentos$: Observable<any[]>;

  constructor(public app: App ,
    public navCtrl: NavController,
    private readonly camera: Camera,
    private store: Store<AppState>,
    private socketIoProvider:SocketIoProvider) {
      this.counter = store.select('counter');
      this.atendimentos$ = store.select("atendimentos");
      this.socketIoProvider.getChamados().subscribe(data=>console.log("oi"));
  }

  ionViewDidLoad() {
    setTimeout(() => this.store.dispatch({type: RETRIEVE_ATENDIMENTOS}), 500);
    console.log('ionViewDidLoad ChamadosPage');
  }

  finalizarChamado(_id: number){
    //this.navCtrl.push(PesquisaPage);
    //this.navCtrl.setRoot(PesquisaPage);
    //this.app.getRootNav().setRoot(PesquisaPage);
    this.app.getRootNavs()[0].setRoot(PesquisaPage);
    //this.app.getRootNavById()
    //this.navCtrl.parent.setRoot(PesquisaPage);
    //this.navCtrl.goToRoot()
  }

  takePhoto() {
    this.camera.getPicture({
      quality: 40,
      //destinationType: this.camera.DestinationType.FILE_URI,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    }).then((imageData:string) => {
      this.myPhoto = imageData.length;
      //this.uploadPhoto(imageData);
      console.log(imageData);
    }, error => {
      this.error = JSON.stringify(error);
    });
  }


}
