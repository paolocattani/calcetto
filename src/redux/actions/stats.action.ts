import { createAsyncAction, createAction } from 'typesafe-actions';
import { defaultAsyncParams, PurgeResponse, PURGE_STORE_ACTION } from './constants';
import {
	StatsBestPairsRequest,
	StatsBestPairsResponse,
	StatsBestPlayersRequest,
	StatsBestPlayersResponse,
	StatsError,
} from '../../@common/models';

const actionName = '[Stats]';
export const StatsAction = {
	// fetch player Stats
	fetchBestPlayers: createAsyncAction(...defaultAsyncParams(actionName, 'Fetch Best Player Stats'))<
		StatsBestPlayersRequest,
		StatsBestPlayersResponse,
		StatsError
	>(),
	// fetch pair Stats
	fetchBestPairs: createAsyncAction(...defaultAsyncParams(actionName, 'Fetch Best Pairs Stats'))<
		StatsBestPairsRequest,
		StatsBestPairsResponse,
		StatsError
	>(),
	purge: createAction(PURGE_STORE_ACTION)<PurgeResponse>(),
};
