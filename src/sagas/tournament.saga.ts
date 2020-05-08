import { put, call, StrictEffect, takeEvery } from 'redux-saga/effects';
import { fetchTournaments, postTournament } from 'services/tournament.service';
import { PostTournamentResponse, FetchTournamentsResponse } from 'models/tournament.model';
import { TournamentAction } from 'actions/tournament.action';

// https://medium.com/swlh/asynchronous-with-redux-sagas-b43c9630f218
function* getTournamentsSaga(
  action: ReturnType<typeof TournamentAction.getTournaments.request>
): Generator<StrictEffect, void, any> {
  try {
    const response: FetchTournamentsResponse = yield call(fetchTournaments, action.payload);
    yield put(TournamentAction.getTournaments.success(response));
  } catch (err) {
    yield put(TournamentAction.getTournaments.failure(err));
  }
}

function* postTournamentSaga(
  action: ReturnType<typeof TournamentAction.saveTournament.request>
): Generator<StrictEffect, void, any> {
  try {
    console.log('post saga : ', action.payload);
    const response: PostTournamentResponse = yield call(postTournament, action.payload);
    yield put(TournamentAction.saveTournament.success(response));
  } catch (err) {
    yield put(TournamentAction.saveTournament.failure(err));
  }
}

export const TournamentsSagas = [
  takeEvery(TournamentAction.getTournaments.request, getTournamentsSaga),
  takeEvery(TournamentAction.saveTournament.request, postTournamentSaga),
];
