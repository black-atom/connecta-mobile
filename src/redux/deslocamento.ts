import { Action } from "@ngrx/store";
import { Deslocamento } from "../models/deslocamento";

export const CRIAR_DESLOCAMENTO = "CRIAR_DESLOCAMENTO";
export const EDITAR_DESLOCAMENTO = "EDITAR_DESLOCAMENTO";
export const DESLOCAMENTO_SUCCESS = "DESLOCAMENTO_SUCCESS";


export class criarDeslocamento implements Action {
  readonly type: string = CRIAR_DESLOCAMENTO;
  constructor(public payload: Deslocamento) {}
}

export class editarDeslocamento implements Action {
  readonly type: string = EDITAR_DESLOCAMENTO;
  constructor(public payload: Deslocamento) {}
}

export class successDeslocamento implements Action {
  readonly type: string = EDITAR_DESLOCAMENTO;
  constructor(public payload: Deslocamento) {}
}

export type deslocamentoActions =
  | criarDeslocamento
  | editarDeslocamento
  | successDeslocamento;

export const deslocamentoReducer = (state: Deslocamento[] = [], action: deslocamentoActions) => {

  switch (action.type) {

    case CRIAR_DESLOCAMENTO: {
      const CriarDeslocamento = {
        km_inicial: action.payload.km_inicial,
        km_final: null,
        data_hora_inicial_km: action.payload.data_hora_inicial_km,
        data_hora_final_km: null,
        data_hora_inicial_virgente_local: null,
        data_hora_final_virgente_local: null,
        tipo_quilometragem: action.payload.tipo_quilometragem,
        isUpload: false
      };
      return [...state, CriarDeslocamento];
    }

    case EDITAR_DESLOCAMENTO: {
      const findDeslocamento = state.find(
        deslocamento => deslocamento._id === action.payload._id
      );
      const deslocamentoId = Object.assign(findDeslocamento, action.payload, { isUpload: false });
      return state.map(deslocamento => {
        deslocamento._id === deslocamentoId._id ? deslocamentoId : deslocamento;
      });
    }

    case DESLOCAMENTO_SUCCESS: {
      const findDeslocamento = state.find(
        deslocamento => deslocamento._id === action.payload._id
      );
      const deslocamentoId = Object.assign(findDeslocamento, action.payload, { isUpload: true });
      return state.map(deslocamento => {
        deslocamento._id === deslocamentoId._id ? deslocamentoId : deslocamento;
      });
    }

    default:
      return state;
  }
};
