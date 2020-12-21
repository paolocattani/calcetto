import { put, StrictEffect, takeEvery } from 'redux-saga/effects';
import { fetchTournaments, postTournament, updateTournament } from '../services/tournament.service';
import {
	SaveTournamentResponse,
	FetchTournamentsResponse,
	UpdateTournamentResponse,
	FetchTournamentsRequest,
	UpdateTournamentRequest,
	SaveTournamentRequest,
	TournamentError,
} from '../../@common/models/tournament.model';
import { TournamentAction } from '../actions/tournament.action';
import { entityLifeCycle } from './utils';

// https://medium.com/swlh/asynchronous-with-redux-sagas-b43c9630f218
function* getTournamentsSaga({
	payload,
}: ReturnType<typeof TournamentAction.fetch.request>): Generator<StrictEffect, void, any> {
	yield* entityLifeCycle<FetchTournamentsRequest, FetchTournamentsResponse, TournamentError>(
		TournamentAction.fetch,
		fetchTournaments,
		payload
	);
}

function* saveTournamentSaga({
	payload,
}: ReturnType<typeof TournamentAction.save.request>): Generator<StrictEffect, void, any> {
	const onSuccess = function* (response: SaveTournamentResponse) {
		console.log("saveTournamentSaga :", response);
		// Reload tournament List
		yield put(TournamentAction.setTournament(response.tournament));
		yield put(TournamentAction.fetch.request({}));
		// Send user to pair page
		payload.history.push('/tournament');
	};
	yield* entityLifeCycle<SaveTournamentRequest, SaveTournamentResponse, TournamentError>(
		TournamentAction.save,
		postTournament,
		payload,
		onSuccess
	);
}

function* updateTournamentSaga({
	payload,
}: ReturnType<typeof TournamentAction.update.request>): Generator<StrictEffect, void, any> {
	yield* entityLifeCycle<UpdateTournamentRequest, UpdateTournamentResponse, TournamentError>(
		TournamentAction.update,
		updateTournament,
		payload
	);
}

export const TournamentSagas = [
	takeEvery(TournamentAction.fetch.request, getTournamentsSaga),
	takeEvery(TournamentAction.save.request, saveTournamentSaga),
	takeEvery(TournamentAction.update.request, updateTournamentSaga),
];
