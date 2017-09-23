import { Atendimento } from '../../models/atendimento';
import { loginReducer, LoginState } from './../../pages/login/redux/login.reducer';
import { Action } from '@ngrx/store';
import { networkReducer } from './networkReducer';
import { atendimentosReducer } from './atendimentos';
import { ActionReducerMap, combineReducers } from '@ngrx/store';

export const reducer = {
    atendimentos: atendimentosReducer,
    networkStatus: networkReducer,
    login: loginReducer
}

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export interface AppState {
  counter: number;
  networkStatus: boolean;
  atendimentos: Atendimento[];
  login: LoginState
}
