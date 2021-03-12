import { put, select, takeEvery } from 'redux-saga/effects';
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
	Redirect,
} from '../../@common/models';
import { TournamentAction } from '../actions/tournament.action';
import { entityLifeCycle } from './utils';
import { PairAction, Stage1Action, Stage2Action } from '../actions';
import { TournamentSelector } from '../selectors';
import { EventAction } from '../actions/event.action';
import { TournamentDTO, TournamentProgress } from '../../@common/dto';

const onSuccessRedirect = (redirect?: Redirect) => {
	if (redirect) {
		redirect.history.push(redirect.path);
	}
};

// https://medium.com/swlh/asynchronous-with-redux-sagas-b43c9630f218
function* fetchTournamentsSaga({ payload }: ReturnType<typeof TournamentAction.fetch.request>) {
	const onSuccess = (response: FetchTournamentsResponse) => {
		onSuccessRedirect(payload.redirect);
	};
	yield* entityLifeCycle<FetchTournamentsRequest, FetchTournamentsResponse, TournamentError>(
		TournamentAction.fetch,
		fetchTournaments,
		payload,
		onSuccess
	);
}

function* reloadTournamentSaga({ payload }: ReturnType<typeof TournamentAction.reload.request>) {
	yield* entityLifeCycle<ReloadTournamentRequest, ReloadTournamentResponse, TournamentError>(
		TournamentAction.reload,
		reloadTournament,
		payload,
		() => onSuccessRedirect(payload.redirect),
		undefined,
		false
	);
}

function* saveTournamentSaga({ payload }: ReturnType<typeof TournamentAction.save.request>) {
	const onSuccess = function* (response: SaveTournamentResponse) {
		// Reload tournament List
		// yield put(TournamentAction.fetch.request({}));
		// Reset next steps
		yield put(PairAction.reset({}));
		yield put(Stage1Action.reset({}));
		yield put(Stage2Action.reset({}));
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
	const tournament: TournamentDTO = yield select(TournamentSelector.getTournament);

	// Notify new tournament
	if (
		tournament.public &&
		tournament.progress === TournamentProgress.PairsSelection &&
		payload.tournament.progress === TournamentProgress.Stage1
	) {
		yield put(EventAction.newTournament.request({ tournament: payload.tournament }));
	}
	// Notify Tournament update
	if (
		tournament.public &&
		tournament.progress === TournamentProgress.Stage1 &&
		payload.tournament.progress === TournamentProgress.Stage2
	) {
		yield put(EventAction.updateTournament.request({ tournament: payload.tournament }));
	}
	// Notify tournament is no loger available
	if (
		tournament.public &&
		tournament.progress === TournamentProgress.PairsSelection &&
		payload.tournament.progress === TournamentProgress.Stage1
	) {
		yield put(EventAction.deleteTournament.request({ tournament: payload.tournament }));
	}

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
