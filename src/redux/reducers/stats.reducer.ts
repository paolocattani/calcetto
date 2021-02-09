import { StatsState } from 'src/@common/models';
import { createReducer, Action } from 'typesafe-actions';
import { StatsAction } from '../actions';

export const initialStatsState: StatsState = {
	isLoading: false,
};

export const StatsReducer = createReducer<StatsState, Action>(initialStatsState)
	.handleAction([StatsAction.fetchBestPairs.request, StatsAction.fetchBestPlayers.request], (state) => ({
		...state,
		isLoading: true,
	}))
	.handleAction([StatsAction.fetchBestPairs.failure, StatsAction.fetchBestPlayers.failure], (state) => ({
		...state,
		isLoading: false,
	}))
	.handleAction([StatsAction.fetchBestPairs.success], (state, { payload: { stats } }) => ({
		...state,
		isLoading: false,
		pairs: stats,
	}))
	.handleAction([StatsAction.fetchBestPlayers.success], (state, { payload: { stats } }) => ({
		...state,
		isLoading: false,
		players: stats,
	}));
