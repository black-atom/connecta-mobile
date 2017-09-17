import { Atendimento } from './../../models/atendimento';
import { Observable } from 'rxjs/Rx';
import { Funcionario } from '../../models/funcionario';
import { LoginState } from './../../pages/login/redux/login.reducer';
import { AppState } from '../../redux/reducers';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';


/*
  Generated class for the AtendimentoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AtendimentoProvider {

  private url = "http://165.227.78.113:3000/api/atendimentos";

  constructor(public http: AuthHttp, private store: Store<AppState>) {

  }

  getAllAtendimentos(): Observable<Atendimento[]>{
    return this.store.select(appState => appState.login.funcionario)
    .take(1)
    .switchMap(funcionario =>
        this.http.get(this.url,{
          params: {
            'tecnico._id': funcionario._id
          }
        }).map( response => response.json() as Atendimento[])
        .catch(this.lidaComErro)
    )
  }

  updateMany(atendimentos: Atendimento[]): Observable<Atendimento[]>{
    console.dir(atendimentos)
    return this.http.patch(this.url, atendimentos).map( response => response.json() as Atendimento[])
    .catch(this.lidaComErro);
  }

  lidaComErro(erro: Response | any) {

      let mensagemErro: string;

      if (erro instanceof Response) {
          mensagemErro = `Ocorreu o erro ${erro.status}`;
      } else {
          mensagemErro = erro.toString();
      }

      console.log(mensagemErro);
      return Observable.throw(mensagemErro);
  }


}
