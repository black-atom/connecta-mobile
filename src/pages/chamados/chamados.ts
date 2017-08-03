import { Camera } from '@ionic-native/camera';
import { PesquisaPage } from '../pesquisa/pesquisa';
import { SocketIoProvider } from './../../providers/socket-io/socket-io';
import { Component } from '@angular/core';
import { App, IonicPage, Loading, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';

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

  chamados = [
    {_id:1, client: 'Microsoft'},
    {_id:2, client: 'Red Hat'},
    {_id:3, client: 'Google'}
  ];

  public myPhoto: any;
  public myPhotoURL: any;
  public error: string;
  private loading: Loading;

  constructor(public app: App ,
    public navCtrl: NavController,
    private readonly camera: Camera,
    private socketIoProvider:SocketIoProvider) {
    this.socketIoProvider.getChamados().subscribe(data=>console.log("oi"));
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
