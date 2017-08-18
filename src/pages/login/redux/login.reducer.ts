import { Funcionario } from './../../../models/funcionario';
import { LoginState } from './login.reducer';
import { LoginActions } from './login.actions';
import { Action, ActionReducer } from '@ngrx/store';

export interface LoginState {
  logged: boolean;
  token: string;
  funcionario: Funcionario
}

const initialState : LoginState = {
  logged: false,
  token: "",
  funcionario: null
};

export const loginReducer: ActionReducer<any> =
  (state = initialState, { type, payload }: Action) => {
    switch (type) {
      case LoginActions.LOGIN_SUCCESS:
        return Object.assign({}, state, payload, {logged: true});
      case LoginActions.LOGOUT_SUCCESS:
        return Object.assign({}, state, {token: "", logged: false});
      default:
        return state;
    }
};