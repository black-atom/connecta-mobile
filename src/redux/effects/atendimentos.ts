import { ActionWithPayload } from './../reducers/index';
import { AtendimentoProvider } from '../../providers/atendimento/atendimento';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import {
    RETRIEVE_ATENDIMENTOS,
    RETRIEVE_ATENDIMENTOS_FAILED,
    RetriveAtendimentoSuccess,
    SYNC_ATENDIMENTOS,
    SYNC_ATENDIMENTOS_FAILED,
    SyncAtendimentosSuccess,
} from './../actions/atendimentos';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

@Injectable()
export class AtendimentoEffects {
  constructor(
    private atendimentoProvider: AtendimentoProvider,
    private actions$: Actions
  ) { }

  @Effect() login$ = this.actions$
      .ofType(RETRIEVE_ATENDIMENTOS)
      .map((action: ActionWithPayload<any>) => action.payload)
      .switchMap(payload =>
        this.atendimentoProvider.getAllAtendimentosToday()
          .map(res => res.atendimentos)
        //.retryWhen(error => error.delay(2000).take(1).catch(() => Observable.of({ type: RETRIEVE_ATENDIMENTOS_FAILED })))
          .catch((error) => Observable.of({ type: RETRIEVE_ATENDIMENTOS_FAILED, payload: error }))
      )
      .switchMap(atendimentos =>
        this.atendimentoProvider.getAllAtendimentosTomorrow()
          .map(res => {
            const atendimentoTodayAndTomorrow = [...atendimentos, ...res.atendimentos];
            return new RetriveAtendimentoSuccess(atendimentoTodayAndTomorrow);
          })
          .catch((error) => Observable.of({ type: RETRIEVE_ATENDIMENTOS_FAILED, payload: error }))
      );

  @Effect() syncAtendimentos$ = this.actions$
      .ofType(SYNC_ATENDIMENTOS)
      .map((action: ActionWithPayload<any>) => action.payload)
      .switchMap(payload => this.atendimentoProvider.updateMany(payload)
        .flatMap(() => Observable.from(payload))
        .map(res => new SyncAtendimentosSuccess(res))
        .catch((error) => Observable.of({ type: SYNC_ATENDIMENTOS_FAILED, payload: error }))
      )
      // .switchMap( payload => this.)

}
