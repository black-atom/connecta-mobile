import { LoadStateDBSuccess, SAVE_STATE_DB, SAVE_STATE_DB_SUCCESS } from './../actions/persistStateActions';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';


import { Storage } from '@ionic/storage';


import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

@Injectable()
export class persistDBEffects {
  constructor(
    private storage: Storage,
    private actions$: Actions
  ) { }

  @Effect() loadState$ = this.actions$
      .ofType('@ngrx/store/init')
      .switchMap(action => Observable.fromPromise(this.storage.get("state")))
      .filter( state => state!==undefined && state!=null)
      .map(state => new LoadStateDBSuccess(state))

  @Effect() saveState$ = this.actions$
      .ofType(SAVE_STATE_DB)
      .map(action => action.payload)
      .switchMap(payload => Observable.fromPromise(this.storage.set("state", payload)))
      .map(state => ({type: SAVE_STATE_DB_SUCCESS, payload: state}))
}
