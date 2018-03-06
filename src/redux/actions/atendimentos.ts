import { Action } from "@ngrx/store";


export const RETRIEVE_ATENDIMENTOS = "RETRIEVE_ATENDIMENTOS";
export const RETRIEVE_ATENDIMENTOS_SUCCESS = "RETRIEVE_ATENDIMENTOS_SUCCESS";
export const RETRIEVE_ATENDIMENTOS_FAILED = "RETRIEVE_ATENDIMENTOS_FAILED";
export const INICIAR_ATENDIMENTO = "INICIAR_ATENDIMENTO";
export const EM_DESLOCAMENTO = "EMDESLOCAMENTO";
export const CHEGOU_AO_DESTINO = "CHEGOU_AO_DESTINO";
export const FIM_ATENDIMENTO = "FIM_ATENDIMENTO";
export const EDITAR_ATENDIMENTO = "EDITAR_ATENDIMENTO";
export const SYNC_ATENDIMENTOS = "SYNC_ATENDIMENTOS";
export const SYNC_ATENDIMENTOS_SUCCESS = "SYNC_ATENDIMENTOS_SUCCESS";
export const SYNC_ATENDIMENTOS_FAILED = "SYNC_ATENDIMENTOS_FAILED";
export const ADICIONAR_PERGUNTAS = "ADICIONAR_PERGUNTAS";

export class RetriveAtendimentoSuccess implements Action{
    readonly type: string = RETRIEVE_ATENDIMENTOS_SUCCESS;
    constructor(public payload) { }
}

export class SyncAtendimentosSuccess implements Action{
    readonly type: string = SYNC_ATENDIMENTOS_SUCCESS;
    constructor(public payload) { }
}

export class SyncAtendimentos implements Action{
    readonly type: string = SYNC_ATENDIMENTOS;
    constructor(public payload) { }
}

export class EditarAtendimento implements Action{
    readonly type: string = EDITAR_ATENDIMENTO;
    constructor(public payload) { }
}

export class IniciarAtendimento implements Action{
  readonly type: string = INICIAR_ATENDIMENTO;
  constructor(public payload) { }
}

export class FimAtendimento implements Action{
  readonly type: string = FIM_ATENDIMENTO;
  constructor(public payload) { }
}

export class EmDeslocamento implements Action{
    readonly type: string = EM_DESLOCAMENTO;
    constructor(public payload) { }
}

export class ChegouAoDestino implements Action{
    readonly type: string = CHEGOU_AO_DESTINO;
    constructor(public payload) { }
}

export class AdicionarPerguntas implements Action{
    readonly type: string = ADICIONAR_PERGUNTAS;
    constructor(public payload) { }
}


export type Actions  = RetriveAtendimentoSuccess;
