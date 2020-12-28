import { createReducer, Action } from 'typesafe-actions';
import { PairState } from '../../@common/models';
import { PairAction } from '../actions';

export const initialPairState: PairState = {
	isLoading: false,
	isSaving: false,
};

export const PairReducer = createReducer<PairState, Action>(initialPairState)
	// Request
	.handleAction([PairAction.fetch.request], (state) => ({
		...state,
		isLoading: true,
	}))
	// Failure
	.handleAction([PairAction.fetch.failure], (state) => ({
		...state,
		isLoading: false,
	}))
	// Fetch Tournament
	.handleAction(PairAction.fetch.success, (state, { payload: { pairsList } }) => ({
		pairsList,
		isLoading: false,
		isSaving: false,
	}))
	.handleAction(PairAction.reset, () => initialPairState)
	.handleAction(PairAction.purge, () => initialPairState);
