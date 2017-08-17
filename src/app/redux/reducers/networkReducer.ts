import { NETWORK_DISCONNETED } from './../actions/networkActions';
import { NETWORK_CONNECTED } from '../actions/networkActions';
import { Action } from '@ngrx/store';

export function networkReducer(state = true, action: Action) {
	switch (action.type) {
		case NETWORK_CONNECTED:
			return true;

		case NETWORK_DISCONNETED:
			return false;


		default:
			return state;
	}
}
