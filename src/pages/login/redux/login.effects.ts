import { SaveStateDB } from './../../../redux/actions/persistStateActions';
import { AppState } from '../../../redux/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { LoginActions } from './login.actions';
import { Login } from './../models/login';
import { LoginProvider } from './../../../providers/login/login';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import {Storage} from '@ionic/storage';

let storage = new Storage({});

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private loginService: LoginProvider
  ) { }

  @Effect() login$ = this.actions$
  .ofType(LoginActions.LOGIN)
  .map( action => action.payload)
  .switchMap((payload) => {
    return this.loginService.login(payload)
    .do(response => storage.set("token", response.token))
    .map(response => LoginActions.loginSuccess(response))
    .catch(() => {
      return Observable.of({ type: LoginActions.LOGIN_FAILED })
    })
  })

  @Effect() loginSucess = this.actions$
  .ofType(LoginActions.LOGIN_SUCCESS)
  .switchMap(() => this.store.select(appstate => appstate).take(1))
  .map((state:AppState) => new SaveStateDB(state));

}
