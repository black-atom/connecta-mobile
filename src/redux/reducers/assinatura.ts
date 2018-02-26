import { Assinatura } from './../../models/atendimento';
import { Action, createSelector } from '@ngrx/store';
import { AppState } from '.';

export const ADD_ASSINATURA = 'ADD_ASSINATURA';
export const UPLOAD_ASSINATURA = 'UPLOAD_ASSINATURA';
export const UPLOAD_ASSINATURA_SUCCESS = 'UPLOAD_ASSINATURA_SUCCESS';
export const UPLOAD_ASSINATURA_FAILED = 'UPLOAD_ASSINATURA_FAILED';

export class AddAssinatura implements Action {
  readonly type = ADD_ASSINATURA;
  payload: Assinatura;
  constructor(payload: Assinatura){
    this.payload = {
      ...payload,
      isUploaded: false,
      isUploading: false,
    }
  }
}

export class UploadAssinatura implements Action {
  readonly type = UPLOAD_ASSINATURA;
  payload: Assinatura;
  constructor(payload: Assinatura){
    this.payload = {
      ...payload,
      isUploading: true
    }
  }
}

export class UploadAssinaturaSuccess implements Action {
  readonly type = UPLOAD_ASSINATURA_SUCCESS;
  payload: Assinatura;
  constructor(payload: Assinatura){
    this.payload = {
      ...payload,
      isUploading: false,
      isUploaded: true
    }
  }
}

export class UploadAssinaturaFailed implements Action {
  readonly type = UPLOAD_ASSINATURA_FAILED;
  payload: Assinatura;
  constructor(payload: Assinatura){
    this.payload = {
      ...payload,
      isUploading: false,
      isUploaded: false
    }
  }
}

export type assinaturaActions =
  | AddAssinatura
  | UploadAssinatura
  | UploadAssinaturaSuccess
  | UploadAssinaturaFailed;


const mapper = (assinatura: Assinatura) => (stateItem: Assinatura) => {
  return assinatura.atendimentoID === stateItem.atendimentoID ?
    assinatura : stateItem
}

export const AssinaturaReducer = (state: Assinatura[] = [], action: assinaturaActions) => {

  switch (action.type) {

    case ADD_ASSINATURA: {
      return [...state, action.payload];
    }

    case UPLOAD_ASSINATURA: {
      return state.map(mapper(action.payload))
    }

    case UPLOAD_ASSINATURA_SUCCESS: {
      return state.map(mapper(action.payload))
    }

    case UPLOAD_ASSINATURA_FAILED: {
      return state.map(mapper(action.payload))
    }

    default:
      return state;
  }
};

export const selectImagens = (state: AppState) => state.assinaturas;

export const getAssinaturasToUpload = createSelector(selectImagens, (assinaturas: Assinatura[]) =>
assinaturas.filter((assinatura:Assinatura) => !assinatura.isUploading && !assinatura.isUploaded));
