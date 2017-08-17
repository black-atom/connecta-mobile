import { LOAD_STATE_DB_SUCCESS } from './../actions/persistStateActions';
import { SAVE_STATE_DB } from '../actions/persistStateActions';
import { Action } from '@ngrx/store';
import { networkReducer } from './networkReducer';
import { atendimentosReducer } from './atendimentos';
import { ActionReducer, combineReducers } from '@ngrx/store';

export const reducers = {
    atendimentos: atendimentosReducer,
    networkStatus: networkReducer,
}


const productionReducer: ActionReducer<any> = combineReducers(reducers);

export function reducer(state: any, action: Action) {
    console.log(state);
    switch(action.type){
      case 'LOAD_STATE_DB_SUCCESS':
        console.log(action.type);
        console.dir(state);
        return state;
      //default SAVE_STATE_DB:


    }
    return productionReducer(state, action);
}


export interface AppState {
  counter: number;
  networkStatus: boolean;
  atendimentos: [any];
}
