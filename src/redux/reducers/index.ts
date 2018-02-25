import { AssinaturaReducer } from './assinatura';
import { imagemReducer } from './imagem.reducer';
import { Imagem } from './../../models/imagem';
import { Atendimento, Assinatura } from '../../models/atendimento';
import { loginReducer, LoginState } from './../../pages/login/redux/login.reducer';
import { Action } from '@ngrx/store';
import { networkReducer } from './networkReducer';
import { atendimentosReducer } from './atendimentos';

import { MonitoramentoReducer } from './monitoramento';
import { Monitoramento } from '../../models/monitoramento';

export const reducer = {
    atendimentos: atendimentosReducer,
    networkStatus: networkReducer,
    login: loginReducer,
    imagens: imagemReducer,
    monitoramentos: MonitoramentoReducer,
    assinaturas: AssinaturaReducer,
}

export interface ActionWithPayload<T> extends Action {
  payload?: T;
}

export interface AppState {
  counter: number;
  networkStatus: boolean;
  atendimentos: Atendimento[];
  imagens: Imagem[];
  login: LoginState;
  monitoramentos: Monitoramento[];
  assinaturas: Assinatura[];
}
