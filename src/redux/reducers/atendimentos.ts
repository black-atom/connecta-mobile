import { Atendimento } from './../../models/atendimento';
import { SYNC_ATENDIMENTOS_SUCCESS } from './../actions/atendimentos';
import {
    Actions,
    RETRIEVE_ATENDIMENTOS,
    RETRIEVE_ATENDIMENTOS_FAILED,
    RETRIEVE_ATENDIMENTOS_SUCCESS,
} from '../actions/atendimentos';
import { ActionReducer, Action } from '@ngrx/store';


export function atendimentosReducer(state:Atendimento[] = [], action: Actions) {
	switch (action.type) {
		case RETRIEVE_ATENDIMENTOS:
			return state;

		case RETRIEVE_ATENDIMENTOS_SUCCESS:
			return action.payload;

		case RETRIEVE_ATENDIMENTOS_FAILED:
      return state;
    case  SYNC_ATENDIMENTOS_SUCCESS:{
      const atendimentos = state.map(atendimento =>{
        const achou = action.payload.find((atendimentoSynced:Atendimento)=> atendimentoSynced._id === atendimento._id);
        if(achou){
          atendimento.synced = true;
        }else{
          return atendimento;
        }
      })
      return atendimentos;
    }

		default:
			return state;
	}
}
