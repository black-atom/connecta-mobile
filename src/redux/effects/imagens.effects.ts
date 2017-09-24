import { ImagemProvider } from './../../providers/imagem/imagem';
import { Imagem } from '../../models/imagem';
import { ActionWithPayload } from '../reducers';
import { UPLOAD_IMAGEM, UploadImagemSuccess, UploadImagemFailed } from './../actions/imagem.actions';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Effect, toPayload, Actions } from '@ngrx/effects';

@Injectable()
export class ImagemEffects{
  counter = 0
  constructor(private actions$: Actions,private imagemProvider: ImagemProvider){

  }

  @Effect() upload$ = this.actions$.ofType(UPLOAD_IMAGEM)
  .map((action: ActionWithPayload<Imagem>) => action.payload)
  .mergeMap(imagem =>  this.imagemProvider.enviarFoto(imagem)
      .map(() => new UploadImagemSuccess(imagem))
      //.catch(() => new UploadImagemFailed(imagem))
  )
}
