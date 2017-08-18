import { Observable } from 'rxjs/Rx';
import { LoginActions } from './login.actions';
import { Login } from './../models/login';
import { LoginProvider } from './../../../providers/login/login';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private loginService: LoginProvider
  ) { }

  @Effect() login$ = this.actions$
  .ofType(LoginActions.LOGIN)
  .map( action => action.payload)
  .switchMap((payload) => {
    return this.loginService.login(payload)
    .map(response => LoginActions.loginSuccess(response))
    .catch(() => Observable.of({ type: LoginActions.LOGIN_FAILED }))
  })

}
