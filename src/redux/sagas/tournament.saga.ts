import { put, call, StrictEffect, takeEvery } from 'redux-saga/effects';
import { fetchTournaments, postTournament, updateTournament } from 'redux/services/tournament.service';
import {
  SaveTournamentResponse,
  FetchTournamentsResponse,
  UpdateTournamentResponse,
  FetchTournamentsRequest,
  UpdateTournamentRequest,
} from '@common/models/tournament.model';
import { TournamentAction } from 'redux/actions/tournament.action';
import { HTTPStatusCode } from '@common/models/HttpStatusCode';
import { toast } from 'react-toastify';
import { UnexpectedServerError } from '../../@common/models/common.models';
import { entityLifeCycle } from './utils';

// https://medium.com/swlh/asynchronous-with-redux-sagas-b43c9630f218
function* getTournamentsSaga({
  payload,
}: ReturnType<typeof TournamentAction.fetch.request>): Generator<StrictEffect, void, any> {
  yield entityLifeCycle<FetchTournamentsRequest, FetchTournamentsResponse>(
    TournamentAction.fetch,
    fetchTournaments,
    payload
  );
}

function* saveTournamentSaga(
  action: ReturnType<typeof TournamentAction.save.request>
): Generator<StrictEffect, void, any> {
  try {
    const response: SaveTournamentResponse = yield call(postTournament, action.payload);
    if (response.code === HTTPStatusCode.Success) {
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

function* updateTournamentSaga({
  payload,
}: ReturnType<typeof TournamentAction.update.request>): Generator<StrictEffect, void, any> {
  yield entityLifeCycle<UpdateTournamentRequest, UpdateTournamentResponse>(
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
