import { Action } from 'rxjs/scheduler/Action';
import { AtendimentoProvider } from '../../providers/atendimento/atendimento';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';



import {
    RETRIEVE_ATENDIMENTOS,
    RETRIEVE_ATENDIMENTOS_FAILED,
    RETRIEVE_ATENDIMENTOS_SUCCESS,
    RetriveAtendimentoSuccess,
    SYNC_ATENDIMENTOS,
    SYNC_ATENDIMENTOS_FAILED,
    SyncAtendimentosSuccess,
} from './../actions/atendimentos';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect, toPayload } from '@ngrx/effects';


@Injectable()
export class AtendimentoEffects {
  constructor(
    private atendimentoProvider: AtendimentoProvider,
    private actions$: Actions
  ) { }

  @Effect() login$ = this.actions$
      .ofType(RETRIEVE_ATENDIMENTOS)
      .map(action => action.payload)
      .switchMap(payload =>
        this.atendimentoProvider.getAllAtendimentos()
        //.retryWhen(error => error.delay(2000).take(1).catch(() => Observable.of({ type: RETRIEVE_ATENDIMENTOS_FAILED })))
        .map(res => new RetriveAtendimentoSuccess(res))
        .catch((error) => Observable.of({ type: RETRIEVE_ATENDIMENTOS_FAILED, payload: error }))
      );

  @Effect() syncAtendimentos$ = this.actions$
      .ofType(SYNC_ATENDIMENTOS)
      .map(action => action.payload)
      .switchMap(payload => this.atendimentoProvider.updateMany(payload)
        .map(res => new SyncAtendimentosSuccess(res))
      )
      .catch((error) => Observable.of({ type: SYNC_ATENDIMENTOS_FAILED, payload: error }))
      // .switchMap( payload => this.)

}
