import { AppState } from './index';
import { Action } from '@ngrx/store';
import { Monitoramento } from '../../models/monitoramento';
import  uuidv4 from 'uuid/v4';
import { createSelector } from '@ngrx/store';

export const MONITORAMENTO_CRIAR_DESLOCAMENTO = 'MONITORAMENTO_CRIAR_DESLOCAMENTO';
export const MONITORAMENTO_EDITAR = 'MONITORAMENTO_EDITAR';
export const MONITORAMENTO_UPLOAD_SUCCESS = 'MONITORAMENTO_UPLOAD_SUCCESS';
export const MONITORAMENTO_UPLOAD_FAILED = 'MONITORAMENTO_UPLOAD_FAILED';

export class inserirKMInicial implements Action {
  readonly type: string = MONITORAMENTO_CRIAR_DESLOCAMENTO;
  public payload: Monitoramento
  constructor(public km_inicial:number, public tipo:string) {
  	this.payload = {
        km_inicial,
        km_final: null,
        data_hora_inicial_km: new Date(),
        data_hora_final_km: null,
        data_hora_inicial_virgente_local: null,
        data_hora_final_virgente_local: null,
        tipo_quilometragem: tipo,
        uuid: uuidv4(),
        isUploaded: false
    }
  }
}

export class inserirKMFinal implements Action {
  readonly type: string = MONITORAMENTO_EDITAR;
  public payload: Monitoramento
  constructor(public km_final:number, public uuid:string) {
  	this.payload = {
    		uuid,
        km_final,
        data_hora_final_km: new Date(),
        isUploaded: false
    }
  }
}

export class updateKMInicial implements Action {
  readonly type: string = MONITORAMENTO_EDITAR;
  public payload: Monitoramento
  constructor(public km_inicial:number, public uuid:string) {
  	this.payload = {
    		uuid,
        km_inicial,
        isUploaded: false
    }
  }
}


export class updateKMFinal implements Action {
  readonly type: string = MONITORAMENTO_EDITAR;
  public payload: Monitoramento
  constructor(public km_final:number, public uuid:string) {
  	this.payload = {
    		uuid,
        km_final,
        isUploaded: false
    }
  }
}


export class iniciarMonitoramento implements Action {
  readonly type: string = MONITORAMENTO_EDITAR;
  public payload: Monitoramento
  constructor(public km_final:number, public uuid:string) {
  	this.payload = {
    		uuid,
        km_final,
        data_hora_final_km: new Date(),
        isUploaded: false
    }
  }
}

export class successMonitoramento implements Action {
  readonly type: string = MONITORAMENTO_UPLOAD_SUCCESS;
  constructor(public payload: Monitoramento) {}
}

export type monitoramentoActions =
    | inserirKMInicial
    | inserirKMFinal
    | iniciarMonitoramento
    | successMonitoramento;

export const MonitoramentoReducer = (state: Monitoramento[] = [], action: monitoramentoActions) => {

  switch (action.type) {

    case MONITORAMENTO_CRIAR_DESLOCAMENTO: {
      return [...state, action.payload];
    }

    case MONITORAMENTO_EDITAR: {
      const monitoramento = state.find(
        deslocamento => deslocamento.uuid === action.payload.uuid
      );
      if(monitoramento){
        const monitoramentoEditado = Object.assign({}, monitoramento,  action.payload);
        return state.map(monitoramento => {
         	return monitoramento.uuid === action.payload.uuid ? monitoramentoEditado : monitoramento;
        });
      }
      return state
    }

    case MONITORAMENTO_UPLOAD_SUCCESS: {
      const findDeslocamento = state.find(
        deslocamento => deslocamento._id === action.payload._id
      );
      const deslocamentoId = Object.assign({}, action.payload, { isUploaded: true });
      return state.map(deslocamento => {
        deslocamento._id === deslocamentoId._id ? deslocamentoId : deslocamento;
      });
    }

    default:
      return state;
  }
};
const getMonitoramentos = (appState: AppState) => appState.monitoramentos;

export const getMonitoramentoAtual = createSelector(getMonitoramentos, (monitoramentos: Monitoramento[]) => {
    return monitoramentos.find(monitoramento => monitoramento.data_hora_final_virgente_local === null)
});
