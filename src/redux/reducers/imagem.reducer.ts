import { ADD_IMAGEM, UPLOAD_IMAGEM_SUCCESS, UPLOAD_IMAGEM } from './../actions/imagem.actions';
import { ActionWithPayload, AppState } from './';
import { Imagem } from './../../models/imagem';
import { createSelector } from '@ngrx/store';


export function imagemReducer(state: Imagem[] = [], action: ActionWithPayload<Imagem | any>){
  switch(action.type){
    case ADD_IMAGEM:
      return [...state, action.payload];
    case UPLOAD_IMAGEM:
      return state.map( imagem => {
        if (imagem.localPath === action.payload.localPath){
          return Object.assign({}, imagem, {isUploading: true});
        }
        return imagem;
      }) 
    case UPLOAD_IMAGEM_SUCCESS:{
      return state.map(imagem => {
        if(imagem.localPath === action.payload.localPath){
          return Object.assign({}, imagem, {isUploaded: true, isUploading: false});
        }else{
          return imagem;
        }
      })
    }
    case UPLOAD_IMAGEM_SUCCESS:{
      return state.map(imagem => {
        if(imagem.localPath === action.payload.localPath){
          return Object.assign({}, imagem, {isUploaded: false, isUploading: false});
        }else{
          return imagem;
        }
      })
    }
    default:
      return state;
  }
}

export const selectImagens = (state: AppState) => state.imagens;

export const selectImagensToUpload = createSelector(selectImagens, (imagens: Imagem[]) => imagens.filter(img => !img.isUploaded && !img.isUploading));

export const nImagensParaUploadSelector = createSelector(selectImagensToUpload, (imagens: Imagem[]) => {
  return imagens.reduce((sum, item) => {
    return sum + 1 ;
  },0);
})


