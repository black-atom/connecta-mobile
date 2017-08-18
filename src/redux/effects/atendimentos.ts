import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';



import { RETRIEVE_ATENDIMENTOS, RETRIEVE_ATENDIMENTOS_SUCCESS, RETRIEVE_ATENDIMENTOS_FAILED, RetriveAtendimentoSuccess } from './../actions/atendimentos';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';


@Injectable()
export class AtendimentoEffects {
  constructor(
    private http: Http,
    private actions$: Actions
  ) { }

  @Effect() login$ = this.actions$
      .ofType(RETRIEVE_ATENDIMENTOS)
      .map(action => action.payload)
      .switchMap(payload =>
        this.http.get('http://localhost:3000/api/atendimentos')
        .retryWhen(error => error.delay(2000).take(1).catch(() => Observable.of({ type: RETRIEVE_ATENDIMENTOS_FAILED })))
        .map(res => new RetriveAtendimentoSuccess(res.json()))
        .catch(() => Observable.of({ type: RETRIEVE_ATENDIMENTOS_FAILED }))
      );
}
