import { createReducer, Action } from 'typesafe-actions';
import { Stage2State } from '../../@common/models';
import { Stage2Action } from '../actions';

export const initialStage2State: Stage2State = {
	isLoading: false,
	toogleRefresh: true,
};

export const Stage2Reducer = createReducer<Stage2State, Action>(initialStage2State)
	//
	.handleAction([Stage2Action.reloadFromServer], (state) => ({ ...state, toogleRefresh: !state.toogleRefresh }))
	// Request
	.handleAction([Stage2Action.fetchStage2.request, Stage2Action.delete.request], (state) => ({
		...state,
		isLoading: true,
	}))
	// Failure
	.handleAction([Stage2Action.fetchStage2.failure], (state) => ({
		...state,
		isLoading: false,
	}))
	// Success
	.handleAction([Stage2Action.fetchStage2.success], (state, { payload: { cells, count } }) => ({
		...state,
		cells,
		count,
		isLoading: false,
	}))
	.handleAction([Stage2Action.delete.success], (state) => ({
		...state,
		cells: undefined,
		count: 0,
		isLoading: false,
	}))
	.handleAction([Stage2Action.setCells], (state, { payload }) => ({
		...state,
		cells: payload,
	}))
	.handleAction([Stage2Action.setLoading], (state, { payload }) => ({
		...state,
		isLoading: payload,
	}))
	.handleAction(Stage2Action.reset, () => initialStage2State)
	.handleAction(Stage2Action.purge, () => initialStage2State);
