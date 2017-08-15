import { Action } from "@ngrx/store";


export const RETRIEVE_ATENDIMENTOS = "RETRIEVE_ATENDIMENTOS";
export const RETRIEVE_ATENDIMENTOS_SUCCESS = "RETRIEVE_ATENDIMENTOS_SUCCESS";
export const RETRIEVE_ATENDIMENTOS_FAILED = "RETRIEVE_ATENDIMENTOS_FAILED";

export class RetriveAtendimentoSuccess implements Action{
    readonly type: string = RETRIEVE_ATENDIMENTOS_SUCCESS;
    constructor(public payload) { }
}
