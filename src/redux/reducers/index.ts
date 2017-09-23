import { imagemReducer } from './imagem.reducer';
import { Imagem } from './../../models/imagem';
import { Atendimento } from '../../models/atendimento';
import { loginReducer, LoginState } from './../../pages/login/redux/login.reducer';
import { Action } from '@ngrx/store';
import { networkReducer } from './networkReducer';
import { atendimentosReducer } from './atendimentos';
import { ActionReducerMap, combineReducers } from '@ngrx/store';

export const reducer = {
    atendimentos: atendimentosReducer,
    networkStatus: networkReducer,
    login: loginReducer,
    imagens: imagemReducer
}

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export interface AppState {
  counter: number;
  networkStatus: boolean;
  atendimentos: Atendimento[];
  imagens: Imagem[];
  login: LoginState
}
