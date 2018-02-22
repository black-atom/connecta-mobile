import { AppState } from './index';
import { Atendimento } from './../../models/atendimento';
import {
    ADICIONAR_PERGUNTAS,
    CHEGOU_AO_DESTINO,
    EDITAR_ATENDIMENTO,
    EM_DESLOCAMENTO,
    INICIAR_ATENDIMENTO,
    SYNC_ATENDIMENTOS_SUCCESS,
    FIM_ATENDIMENTO
} from './../actions/atendimentos';
import {
    Actions,
    RETRIEVE_ATENDIMENTOS,
    RETRIEVE_ATENDIMENTOS_FAILED,
    RETRIEVE_ATENDIMENTOS_SUCCESS,
} from '../actions/atendimentos';


const parseDate = date => (new Date(date.getFullYear(), date.getMonth(), date.getDate()).toString());
const data = date => new date(date);

function changeAtendimento(state:Atendimento[], atendimento: Atendimento): Atendimento[]{
  return state.map(at => {
        if(atendimento._id === at._id){
          return atendimento;
        }else{
          return at;
        }
  })
}

export function atendimentosReducer(state:Atendimento[] = [], action: Actions) {
	switch (action.type) {
		case RETRIEVE_ATENDIMENTOS:
      return state;

    case EDITAR_ATENDIMENTO: {
      const atendimento = state.find(at => at._id === action.payload._id);
      if(atendimento) {
        const interacao_tecnico = { ...atendimento.interacao_tecnico, ...action.payload.interacao_tecnico };
        const novoAt: Atendimento = {...atendimento, interacao_tecnico, synced: false};
        return state.map(at => novoAt._id === at._id ? novoAt : at);
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

    case INICIAR_ATENDIMENTO: {
      const atendimento = state.find( atendimento => atendimento._id === action.payload._id);
      const interacao_tecnico = { ...atendimento.interacao_tecnico, estado: 'inicio_atendimento' };
      const atendimentoModificado = { ...atendimento, synced: false, interacao_tecnico };
      return changeAtendimento(state, atendimentoModificado);
    }

    case EM_DESLOCAMENTO: {
      const atendimento = state.find( atendimento => atendimento._id === action.payload._id);
      const interacao_tecnico = { ...atendimento.interacao_tecnico, estado: 'em_descolamento' };
      const atendimentoModificado = { ...atendimento, synced: false, interacao_tecnico };
      return changeAtendimento(state, atendimentoModificado);
    }

    case CHEGOU_AO_DESTINO: {
      const atendimento = state.find( atendimento => atendimento._id === action.payload._id);
      const interacao_tecnico = { ...atendimento.interacao_tecnico, estado: 'chegou_ao_destino' };
      const atendimentoModificado = { ...atendimento, synced: false, interacao_tecnico };
      return changeAtendimento(state, atendimentoModificado);
    }

    case ADICIONAR_PERGUNTAS: {
      const atendimento = state.find( atendimento => atendimento._id === action.payload._id);
      const interacao_tecnico = { ...atendimento.interacao_tecnico, estado: 'fim_do_atendimento' };
      const avaliacao = action.payload.avaliacao;
      const atendimentoModificado = { ...atendimento, synced: false, interacao_tecnico, ...avaliacao };
      return changeAtendimento(state, atendimentoModificado);
    }

    case FIM_ATENDIMENTO: {
      const atendimento = state.find( atendimento => atendimento._id === action.payload._id);
      const interacao_tecnico = { ...atendimento.interacao_tecnico, estado: 'fim_do_atendimento' };
      const atendimentoModificado = { ...atendimento, synced: false, interacao_tecnico };
      return changeAtendimento(state, atendimentoModificado);
    }

		case RETRIEVE_ATENDIMENTOS_FAILED:
      return state;
    case SYNC_ATENDIMENTOS_SUCCESS: {
       const atendimentos = state.map(atendimento => {
        if(action.payload._id === atendimento._id) {
          return { ...atendimento, synced: true };
        }
        return atendimento;
      })
      return atendimentos;
    }

		default:
			return state;
	}
}

export const selectAtendiementosDeHoje = (state: AppState) => {
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  return state.atendimentos.filter(atendimento => {
    const dataAtendimento = new Date(atendimento.data_atendimento);
    if (
      atendimento.interacao_tecnico.estado !== 'fim_do_atendimento' &&
      (
        dataAtendimento.getDate() > date
        && dataAtendimento.getMonth() == month
        && dataAtendimento.getFullYear() == year
      ) ||
      (
        dataAtendimento.getMonth() > month
        && dataAtendimento.getFullYear() == year
      )
    ) {
      return true;
    }
    return false;
  });
}

export const selectPromixosAtendimentos = (state: AppState) => {
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  return state.atendimentos.filter(atendimento => {
    const dataAtendimento = new Date(atendimento.data_atendimento);
    if(
      (
        dataAtendimento.getDate() > date
        && dataAtendimento.getMonth() >= month
        && dataAtendimento.getFullYear() >= year
      ) ||
      (
        dataAtendimento.getMonth() > month
        && dataAtendimento.getFullYear() >= year
      )
    ){
      return true;
    }
    return false;
  })

}

export const selectAtendimentosConcluidos = (state: AppState) => {
  return state.atendimentos.filter(atendimento => atendimento.interacao_tecnico.estado === 'fim_do_atendimento')
}
