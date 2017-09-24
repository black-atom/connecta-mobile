import { Imagem } from './../../models/imagem';
import { Action } from '@ngrx/store';


export const ADD_IMAGEM = 'ADD_IMAGEM';
export const UPLOAD_IMAGEM = 'UPLOAD_IMAGEM';
export const UPLOAD_IMAGEM_SUCCESS = 'UPLOAD_IMAGEM_SUCCESS';
export const UPLOAD_IMAGEM_FAILED = 'UPLOAD_IMAGEM_FAILED';


export class AddImagem implements Action{
  readonly type = ADD_IMAGEM;
  constructor(public payload: Imagem){ }
}

export class UploadImagem implements Action{
  readonly type = UPLOAD_IMAGEM;
  constructor(public payload: Imagem){ }
}


export class UploadImagemSuccess implements Action{
  readonly type = UPLOAD_IMAGEM_SUCCESS;
  constructor(public payload: Imagem){ }
}

export class UploadImagemFailed implements Action{
  readonly type = UPLOAD_IMAGEM_FAILED;
  constructor(public payload: Imagem){ }
}
