import { put, call, StrictEffect, takeEvery } from 'redux-saga/effects';
import { fetchTournaments, postTournament, updateTournament } from 'redux/services/tournament.service';
import { PostTournamentResponse, FetchTournamentsResponse } from 'redux/models/tournament.model';
import { TournamentAction } from 'redux/actions/tournament.action';

// https://medium.com/swlh/asynchronous-with-redux-sagas-b43c9630f218
function* getTournamentsSaga(
  action: ReturnType<typeof TournamentAction.fetchTournaments.request>
): Generator<StrictEffect, void, any> {
  try {
    const response: FetchTournamentsResponse = yield call(fetchTournaments, action.payload);
    yield put(TournamentAction.fetchTournaments.success(response));
  } catch (err) {
    yield put(TournamentAction.fetchTournaments.failure(err));
  }
}

function* saveTournamentSaga(
  action: ReturnType<typeof TournamentAction.saveTournament.request>
): Generator<StrictEffect, void, any> {
  try {
    const response: PostTournamentResponse = yield call(postTournament, action.payload);
    yield put(TournamentAction.saveTournament.success(response));
  } catch (err) {
    yield put(TournamentAction.saveTournament.failure(err));
  }
}

function* updateTournamentSaga(
  action: ReturnType<typeof TournamentAction.saveTournament.request>
): Generator<StrictEffect, void, any> {
  try {
    const response: PostTournamentResponse = yield call(updateTournament, action.payload);
    yield put(TournamentAction.saveTournament.success(response));
  } catch (err) {
    yield put(TournamentAction.saveTournament.failure(err));
  }
}

export const TournamentsSagas = [
  takeEvery(TournamentAction.fetchTournaments.request, getTournamentsSaga),
  takeEvery(TournamentAction.saveTournament.request, saveTournamentSaga),
  takeEvery(TournamentAction.updateTournament.request, updateTournamentSaga),
];
