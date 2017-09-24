import { ImagemProvider } from './../../providers/imagem/imagem';
import { Imagem } from '../../models/imagem';
import { ActionWithPayload } from '../reducers';
import { UPLOAD_IMAGEM, UploadImagemSuccess, UploadImagemFailed } from './../actions/imagem.actions';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Effect, toPayload, Actions } from '@ngrx/effects';

@Injectable()
export class ImagemEffects{
  constructor(private actions$: Actions,private imagemProvider: ImagemProvider){

  }

  @Effect() upload$ = this.actions$.ofType(UPLOAD_IMAGEM)
  .do(() => console.log("Sucesso Na Nave"))
  .map((action: ActionWithPayload<Imagem>) => action.payload)
  .switchMap(imagem =>  this.imagemProvider.enviarFoto(imagem)
      .do(() => console.log("Sucesso Na Nave"))
      .map(() => new UploadImagemSuccess(imagem))
      //.catch(() => new UploadImagemFailed(imagem))
  )
}
