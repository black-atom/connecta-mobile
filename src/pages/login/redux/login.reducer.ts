import { LoginState } from './login.reducer';
import { LoginActions } from './login.actions';
import { Action, ActionReducer } from '@ngrx/store';

export interface LoginState {
  logged: boolean;
  token: string;
}

const initialState : LoginState = {
  logged: false,
  token: ""
};

export const loginReducer: ActionReducer<any> =
  (state = initialState, { type, payload }: Action) => {
    switch (type) {
      case LoginActions.LOGIN_SUCCESS:
        return Object.assign({}, state, {token: payload, logged: true});
      case LoginActions.LOGOUT_SUCCESS:
        return Object.assign({}, state, {token: "", logged: false});
      default:
        return state;
    }
};
