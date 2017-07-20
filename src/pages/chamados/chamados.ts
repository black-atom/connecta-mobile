import { PesquisaPage } from '../pesquisa/pesquisa';
import { SocketIoProvider } from './../../providers/socket-io/socket-io';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

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
  ]

  constructor(public app: App ,public navCtrl: NavController, private socketIoProvider:SocketIoProvider) {
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

}
