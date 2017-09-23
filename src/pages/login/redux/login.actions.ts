import { ActionWithPayload } from './../../../redux/reducers/index';
import { Login } from '../models/login';
import { Action } from '@ngrx/store';

export class LoginActions {
  static LOGIN = 'LOGIN';
  static LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  static LOGIN_FAILED = 'LOGIN_FAILED';
  static LOGOUT = 'LOGOUT';
  static LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

  static login(payload: Login): ActionWithPayload<any> {
    return { type: LoginActions.LOGIN, payload  };
  }

  static loginSuccess(payload): ActionWithPayload<any> {
    return { type: LoginActions.LOGIN_SUCCESS, payload};
  }

  static logout(): Action {
    return { type: LoginActions.LOGOUT };
  }

  static logoutSuccess(): Action {
    return { type: LoginActions.LOGOUT_SUCCESS };
  }
}
