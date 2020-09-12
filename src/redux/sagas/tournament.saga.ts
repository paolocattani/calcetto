import { put, call, StrictEffect, takeEvery } from 'redux-saga/effects';
import { fetchTournaments, postTournament, updateTournament } from 'redux/services/tournament.service';
import {
  SaveTournamentResponse,
  FetchTournamentsResponse,
  UpdateTournamentResponse,
} from 'redux/models/tournament.model';
import { TournamentAction } from 'redux/actions/tournament.action';
import { HTTPStatusCode } from '@common/models/HttpStatusCode';
import { UnexpectedServerError } from 'redux/services/common';
import { toast } from 'react-toastify';

// https://medium.com/swlh/asynchronous-with-redux-sagas-b43c9630f218
function* getTournamentsSaga(
  action: ReturnType<typeof TournamentAction.fetch.request>
): Generator<StrictEffect, void, any> {
  try {
    const response: FetchTournamentsResponse = yield call(fetchTournaments, action.payload);
    yield put(TournamentAction.fetch.success(response));
  } catch (err) {
    yield put(TournamentAction.fetch.failure(err));
  }
}

function* saveTournamentSaga(
  action: ReturnType<typeof TournamentAction.save.request>
): Generator<StrictEffect, void, any> {
  try {
    const response: SaveTournamentResponse = yield call(postTournament, action.payload);
    if (response.code === HTTPStatusCode.Accepted) {
      yield put(TournamentAction.save.success(response));
      action.payload.history.push('/tournament');
      toast.success(response.userMessage.message);
    } else {
      toast.error(response.userMessage.message);
      yield put(TournamentAction.save.failure(response));
    }
  } catch (err) {
    yield put(TournamentAction.save.failure(UnexpectedServerError));
  }
}

function* updateTournamentSaga(
  action: ReturnType<typeof TournamentAction.update.request>
): Generator<StrictEffect, void, any> {
  try {
    const response: UpdateTournamentResponse = yield call(updateTournament, action.payload);
    if (response.code === HTTPStatusCode.Accepted) {
      yield put(TournamentAction.update.success(response));
      toast.success(response.userMessage.message);
    } else {
      toast.error(response.userMessage.message);
      yield put(TournamentAction.update.failure(response));
    }
  } catch (err) {
    yield put(TournamentAction.update.failure(UnexpectedServerError));
  }
}

export const TournamentsSagas = [
  takeEvery(TournamentAction.fetch.request, getTournamentsSaga),
  takeEvery(TournamentAction.save.request, saveTournamentSaga),
  takeEvery(TournamentAction.update.request, updateTournamentSaga),
];
