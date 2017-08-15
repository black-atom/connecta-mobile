import { RETRIEVE_ATENDIMENTOS, RETRIEVE_ATENDIMENTOS_SUCCESS, RETRIEVE_ATENDIMENTOS_FAILED } from './../actions/atendimentos';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AtendimentoEffects {
  constructor(
    private http: Http,
    private actions$: Actions
  ) { }

  @Effect() login$ = this.actions$
      .ofType(RETRIEVE_ATENDIMENTOS)
      .map(action => action.payload)
      .switchMap(payload => this.http.post('localhost:3000/api/atendimentos', payload)
      .map(res => ({ type: RETRIEVE_ATENDIMENTOS_SUCCESS, payload: res.json() }))
      .catch(() => Observable.of({ type: RETRIEVE_ATENDIMENTOS_FAILED }))
      );
}
