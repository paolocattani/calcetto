import {
	StatsBestPairsRequest,
	StatsBestPairsResponse,
	StatsBestPlayersRequest,
	StatsBestPlayersResponse,
	StatsError,
} from '../../@common/models';
import { takeEvery } from 'redux-saga/effects';
import { entityLifeCycle } from './utils';
import { StatsAction } from '../actions';
import { fetchBestPairs, fetchBestPlayers } from '../services/stats.service';

function* getBestPairs({ payload }: ReturnType<typeof StatsAction.fetchBestPairs.request>) {
	yield* entityLifeCycle<StatsBestPairsRequest, StatsBestPairsResponse, StatsError>(
		StatsAction.fetchBestPairs,
		fetchBestPairs,
		payload
	);
}
function* getBestPlayers({ payload }: ReturnType<typeof StatsAction.fetchBestPairs.request>) {
	yield* entityLifeCycle<StatsBestPlayersRequest, StatsBestPlayersResponse, StatsError>(
		StatsAction.fetchBestPlayers,
		fetchBestPlayers,
		payload
	);
}

export const StatsSagas = [
	takeEvery(StatsAction.fetchBestPairs.request, getBestPairs),
	takeEvery(StatsAction.fetchBestPlayers.request, getBestPlayers),
];
