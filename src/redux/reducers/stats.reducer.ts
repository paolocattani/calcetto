import { StatsState } from 'src/@common/models';
import { createReducer, Action } from 'typesafe-actions';

export const initialStatsState: StatsState = {
	isLoading: false,
};

export const StatsReducer = createReducer<StatsState, Action>(initialStatsState);
