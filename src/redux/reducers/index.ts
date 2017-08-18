import { loginReducer } from './../../pages/login/redux/login.reducer';
import { LOAD_STATE_DB_SUCCESS } from './../actions/persistStateActions';
import { SAVE_STATE_DB } from '../actions/persistStateActions';
import { Action } from '@ngrx/store';
import { networkReducer } from './networkReducer';
import { atendimentosReducer } from './atendimentos';
import { ActionReducer, combineReducers } from '@ngrx/store';

export const reducers = {
    atendimentos: atendimentosReducer,
    networkStatus: networkReducer,
    login: loginReducer
}


const productionReducer: ActionReducer<any> = combineReducers(reducers);

export function reducer(state: any, action: Action) {
    switch(action.type){
      case 'LOAD_STATE_DB_SUCCESS':
        return state;
    }
    return productionReducer(state, action);
}


export interface AppState {
  counter: number;
  networkStatus: boolean;
  atendimentos: [any];
}
