import { Imagem } from './../../models/imagem';
import { Action } from '@ngrx/store';


export const ADD_IMAGEM = 'ADD_IMAGEM';
export const UPLOAD_IMAGENS = 'UPLOAD_IMAGENS';
export const UPLOAD_IMAGEM_SUCCESS = 'UPLOAD_IMAGEM_SUCCESS';


export class AddImagem implements Action{
  readonly type = ADD_IMAGEM;
  constructor(public payload: Imagem){ }
}
