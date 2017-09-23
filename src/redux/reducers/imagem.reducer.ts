import { ADD_IMAGEM } from './../actions/imagem.actions';
import { ActionWithPayload } from './';
import { Imagem } from './../../models/imagem';
import { ActionReducer } from '@ngrx/store';


export function imagemReducer(state = [], action: ActionWithPayload<any>){
  switch(action.type){
    case ADD_IMAGEM:
      return [...state, action.payload];
    default:
      return state;
  }
}
