import { put, call, StrictEffect, takeEvery } from 'redux-saga/effects';
import { PlayerAction } from 'actions/player.action';
import { FetchPlayersResponse } from 'models/player.model';
import { fetchPlayers } from 'services/player.service';

function* getPlayersSaga(
  action: ReturnType<typeof PlayerAction.getPlayers.request>
): Generator<StrictEffect, void, any> {
  try {
    console.log('getPlayersSaga');

    const response: FetchPlayersResponse = yield call(fetchPlayers, action.payload);
    console.log('getPlayersSaga: ', response);

    yield put(PlayerAction.getPlayers.success(response));
  } catch (err) {
    yield put(PlayerAction.getPlayers.failure(err));
  }
}

export const PlayersSagas = [takeEvery(PlayerAction.getPlayers.request, getPlayersSaga)];
