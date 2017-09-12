import { Atendimento } from './../../models/atendimento';
import { EDITAR_ATENDIMENTO, SYNC_ATENDIMENTOS_SUCCESS } from './../actions/atendimentos';
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

    case EDITAR_ATENDIMENTO: {
      const atendimento = state.find(at => at._id === action.payload._id);
      if(atendimento){
        const novoAt: Atendimento = Object.assign({}, atendimento, action.payload, { synced: false});
        return state.map(at => {
          if(novoAt._id === at._id){
            return novoAt;
          }else{
            return at;
          }
        })
      }
    }

		case RETRIEVE_ATENDIMENTOS_SUCCESS:{
      const atendimentos = action.payload.map((atendimento: Atendimento) => {
        const atendimentoFound: Atendimento = state.find(at => at._id === atendimento._id);
        if( atendimentoFound && atendimentoFound.synced === false ){
          return atendimentoFound;
        }else{
          return atendimento;
        }
      });
      return atendimentos;
    }

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
