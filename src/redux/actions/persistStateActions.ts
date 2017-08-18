import { AppState } from './../reducers/index';
import { Action } from '@ngrx/store';

export const LOAD_STATE_DB_SUCCESS = "LOAD_STATE_DB_SUCCESS";
export const SAVE_STATE_DB = "SAVE_STATE_DB";
export const SAVE_STATE_DB_SUCCESS = "SAVE_STATE_DB_SUCCESS";


export class LoadStateDBSuccess implements Action{
    readonly type: string = LOAD_STATE_DB_SUCCESS;
    constructor(public payload: AppState) { }
}

export class SaveStateDB implements Action{
    readonly type: string = SAVE_STATE_DB;
    constructor(public payload: AppState) { }
}

