import { LoginState } from './../../pages/login/redux/login.reducer';
import { Observable } from 'rxjs/Rx';
import { Login } from './../../pages/login/models/login';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginProvider {
  // private url = 'http://localhost:3000/login';
  private url = 'http://165.227.78.113:3000/login';

  constructor(private http: Http) {  }

  login(user: Login): Observable<LoginState>{
    return this.http.post(this.url, user).map( response => response.json() as LoginState);
  }

}
