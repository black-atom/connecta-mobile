import {
    Actions,
    RETRIEVE_ATENDIMENTOS,
    RETRIEVE_ATENDIMENTOS_FAILED,
    RETRIEVE_ATENDIMENTOS_SUCCESS,
} from '../actions/atendimentos';
import { ActionReducer, Action } from '@ngrx/store';


export function atendimentosReducer(state = [], action: Actions) {
	switch (action.type) {
		case RETRIEVE_ATENDIMENTOS:
			return state;

		case RETRIEVE_ATENDIMENTOS_SUCCESS:
			return action.payload;

		case RETRIEVE_ATENDIMENTOS_FAILED:
			return state;

		default:
			return state;
	}
}
