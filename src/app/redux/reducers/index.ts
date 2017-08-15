import { atendimentosReducer } from './atendimentos';
import { counterReducer } from './counter';
import { ActionReducer, combineReducers } from '@ngrx/store';

export const reducers = {
    atendimentos: atendimentosReducer,
    counter: counterReducer
}


const productionReducer: ActionReducer<any> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    console.log(action.type);
    return productionReducer(state, action);
}

