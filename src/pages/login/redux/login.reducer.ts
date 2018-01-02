import { ActionWithPayload, AppState } from './../../../redux/reducers/index';
import { Funcionario } from './../../../models/funcionario';
import { LoginState } from './login.reducer';
import { LoginActions } from './login.actions';
import { ActionReducer } from '@ngrx/store';
import { Storage } from '@ionic/storage';
let storage = new Storage({});


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
  (state = initialState, { type, payload }: ActionWithPayload<any>) => {
    switch (type) {
      case LoginActions.LOGIN_SUCCESS:
        return Object.assign({}, state, payload, {logged: true});
      case LoginActions.LOGOUT:
        storage.clear();
        return Object.assign({}, state, {token: "", logged: false});
      default:
        return state;
    }
};

export const getFuncionario = (appState : AppState) => appState.login.funcionario
