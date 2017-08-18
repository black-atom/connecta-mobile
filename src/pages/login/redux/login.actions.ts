import { Action } from '@ngrx/store';

export class LoginActions {
  static LOGIN = 'LOGIN';
  static LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  static LOGIN_FAILED = 'LOGIN_FAILED';
  static LOGOUT = 'LOGOUT';
  static LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

  login(payload): Action {
    return { type: LoginActions.LOGIN, payload  };
  }

  loginSuccess(payload): Action {
    return { type: LoginActions.LOGIN_SUCCESS, payload};
  }

  logout(): Action {
    return { type: LoginActions.LOGOUT };
  }

  logoutSuccess(): Action {
    return { type: LoginActions.LOGOUT_SUCCESS };
  }
}
