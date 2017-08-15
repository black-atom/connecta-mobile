import { RETRIEVE_ATENDIMENTOS } from '../../app/redux/actions/atendimentos';
import { INCREMENT, DECREMENT, RESET } from './../../app/redux/reducers/counter';
import { Observable } from 'rxjs/Rx';
import { Camera } from '@ionic-native/camera';
import { PesquisaPage } from '../pesquisa/pesquisa';
import { SocketIoProvider } from './../../providers/socket-io/socket-io';
import { Component } from '@angular/core';
import { App, IonicPage, Loading, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Store } from "@ngrx/store";


interface AppState {
  counter: number;
}
/**
 * Generated class for the ChamadosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-chamados',
  templateUrl: 'chamados.html',
})
export class ChamadosPage {
  selectedSegment = "1";
  chamados = [
    {_id:1, client: 'Microsoft'},
    {_id:2, client: 'Red Hat'},
    {_id:3, client: 'Google'},
    {_id:3, client: 'Bradesco'}
  ];

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
      this.store.dispatch({type: RETRIEVE_ATENDIMENTOS});
      this.socketIoProvider.getChamados().subscribe(data=>console.log("oi"));
  }


  increment(){
		this.store.dispatch({ type: INCREMENT });
	}

	decrement(){
		this.store.dispatch({ type: DECREMENT });
	}

	reset(){
		this.store.dispatch({ type: RESET });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChamadosPage');
  }

  finalizarChamado(_id: number){
    console.log(_id);
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
