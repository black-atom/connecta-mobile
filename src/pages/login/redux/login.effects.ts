import { ActionWithPayload } from './../../../redux/reducers/index';
import { AppState } from '../../../redux/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { LoginActions } from './login.actions';
import { LoginProvider } from './../../../providers/login/login';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Storage } from '@ionic/storage';

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
  .map( (action: ActionWithPayload<any>) => action.payload)
  .switchMap((payload) => {
    return this.loginService.login(payload)
    .do(response => storage.set("token", response.token))
    .map(response => LoginActions.loginSuccess(response))
    .catch(() => {
      return Observable.of({ type: LoginActions.LOGIN_FAILED })
    })
  })

}
