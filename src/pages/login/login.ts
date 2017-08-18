import { LoginState } from './redux/login.reducer';
import { Observable } from 'rxjs/Rx';
import { AppState } from './../../redux/reducers/index';
import { LoginActions } from './redux/login.actions';
import { Store } from '@ngrx/store';
import { Login } from './models/login';
import { TabsPage } from '../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username:string = "";
  password: string = "";
  logged$: Observable<LoginState>;

  constructor(public navCtrl: NavController, private store: Store<AppState>) {
  }

  ionViewDidLoad() {
    this.logged$ = this.store.select("login");
    this.logged$.subscribe((data : LoginState) => {
      if(data.logged){
        this.navCtrl.push(TabsPage);
      }
    })
  }

  login(){
    const login: Login = {
      username: this.username,
      password: this.password
    }
    this.store.dispatch(LoginActions.login(login));
  }
}
