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
	Redirect,
} from '../../@common/models';
import { TournamentAction } from '../actions/tournament.action';
import { entityLifeCycle } from './utils';
import { PairAction, Stage1Action, Stage2Action } from '../actions';
import { EventAction } from '../actions/event.action';
import { TournamentProgress } from '../../@common/dto';

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
	const oldProgress = payload.fromProgress;
	const newProgress = payload.tournament.progress;
	const isPublic = payload.tournament.public;
	console.log('Updating touramento : ', oldProgress, newProgress, isPublic);
	// Notify new tournament
	if (isPublic && oldProgress === TournamentProgress.PairsSelection && newProgress === TournamentProgress.Stage1) {
		yield put(EventAction.newTournament.request({ tournament: payload.tournament }));
	}
	// Notify Tournament update
	if (isPublic && oldProgress === TournamentProgress.Stage1 && newProgress === TournamentProgress.Stage2) {
		yield put(EventAction.updateTournament.request({ tournament: payload.tournament }));
	}
	// Notify tournament is no loger available
	if (isPublic && oldProgress === TournamentProgress.Stage1 && newProgress === TournamentProgress.PairsSelection) {
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
