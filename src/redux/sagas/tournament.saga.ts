import { put, takeEvery } from 'redux-saga/effects';
import { fetchTournaments, postTournament, reloadTournament, updateTournament } from '../services/tournament.service';
import {
	SaveTournamentResponse,
	FetchTournamentsResponse,
	UpdateTournamentResponse,
	FetchTournamentsRequest,
	UpdateTournamentRequest,
	SaveTournamentRequest,
	TournamentError,
	ReloadTournamentRequest,
	ReloadTournamentResponse,
} from '../../@common/models/tournament.model';
import { TournamentAction } from '../actions/tournament.action';
import { entityLifeCycle } from './utils';

// https://medium.com/swlh/asynchronous-with-redux-sagas-b43c9630f218
function* fetchTournamentsSaga({ payload }: ReturnType<typeof TournamentAction.fetch.request>) {
	yield* entityLifeCycle<FetchTournamentsRequest, FetchTournamentsResponse, TournamentError>(
		TournamentAction.fetch,
		fetchTournaments,
		payload
	);
}

function* reloadTournamentSaga({ payload }: ReturnType<typeof TournamentAction.reload.request>) {
	yield* entityLifeCycle<ReloadTournamentRequest, ReloadTournamentResponse, TournamentError>(
		TournamentAction.reload,
		reloadTournament,
		payload,undefined,undefined,false
	);
}

function* saveTournamentSaga({ payload }: ReturnType<typeof TournamentAction.save.request>) {
	const onSuccess = function* (response: SaveTournamentResponse) {
		// Reload tournament List
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

function* updateTournamentSaga({ payload }: ReturnType<typeof TournamentAction.update.request>) {
	yield* entityLifeCycle<UpdateTournamentRequest, UpdateTournamentResponse, TournamentError>(
		TournamentAction.update,
		updateTournament,
		payload
	);
}

export const TournamentSagas = [
	takeEvery(TournamentAction.reload.request, reloadTournamentSaga),
	takeEvery(TournamentAction.fetch.request, fetchTournamentsSaga),
	takeEvery(TournamentAction.save.request, saveTournamentSaga),
	takeEvery(TournamentAction.update.request, updateTournamentSaga),
];
