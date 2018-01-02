import { Monitoramento } from './../../models/monitoramento';
import { MONITORAMENTO_CRIAR_DESLOCAMENTO, MonitoramentoUploadSuccess, MonitoramentoUploadFailed, MONITORAMENTO_EDITAR } from './../reducers/monitoramento';
import { MonitoramentoProvider } from './../../providers/monitoramento/monitoramento';
import { Observable } from 'rxjs/Rx';
import { ActionWithPayload } from '../reducers';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

@Injectable()
export class MonitoramentoEffects{
  constructor(private actions$: Actions, private monitoramentoProvider: MonitoramentoProvider){

  }

  @Effect() uploadPost$ = this.actions$.ofType(MONITORAMENTO_CRIAR_DESLOCAMENTO)
  .map((action: ActionWithPayload<Monitoramento>) => action.payload)
  .mergeMap(monitoramento =>  this.monitoramentoProvider.postMonitoramento(monitoramento)
      .map((monitoramentoSalvo) => new MonitoramentoUploadSuccess({...monitoramento, _id: monitoramentoSalvo._id}))
      .catch(() => Observable.of(new MonitoramentoUploadFailed(monitoramento)))
  )

  @Effect() uploadPut$ = this.actions$.ofType(MONITORAMENTO_EDITAR)
  .map((action: ActionWithPayload<Monitoramento>) => action.payload)
  .mergeMap(monitoramento =>  this.monitoramentoProvider.putMonitoramento(monitoramento)
      .map(() => new MonitoramentoUploadSuccess(monitoramento))
      .catch(() => Observable.of(new MonitoramentoUploadFailed(monitoramento)))
  )
}
