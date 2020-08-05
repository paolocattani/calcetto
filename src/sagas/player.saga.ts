import { put, call, StrictEffect, takeEvery } from 'redux-saga/effects';
import { PlayerAction } from 'actions/player.action';
import { FetchPlayersResponse, DeletePlayersResponse, UpdatePlayerResponse } from 'models/player.model';
import { fetchPlayers, deletePlayers, savePlayer } from 'services/player.service';
import { toast } from 'react-toastify';

function* getPlayersSaga(
  action: ReturnType<typeof PlayerAction.getPlayers.request>
): Generator<StrictEffect, void, any> {
  try {
    console.log('getPlayersSaga');

    const { results }: FetchPlayersResponse = yield call(fetchPlayers, action.payload);
    console.log('getPlayersSaga: ', results);
    yield put(PlayerAction.getPlayers.success({ results }));
  } catch (err) {
    yield put(PlayerAction.getPlayers.failure(err));
  }
}

function* deletePlayersSaga(
  action: ReturnType<typeof PlayerAction.deletePlayers.request>
): Generator<StrictEffect, void, any> {
  try {
    const response: DeletePlayersResponse = yield call(deletePlayers, action.payload);
    yield put(PlayerAction.deletePlayers.success(response));
    toast.success('Giocatore eliminato...');
  } catch (err) {
    yield put(PlayerAction.deletePlayers.failure(err));
    toast.error('Errore...');
  }
}

function* savePlayerSaga(
  action: ReturnType<typeof PlayerAction.savePlayer.request>
): Generator<StrictEffect, void, any> {
  try {
    const response: UpdatePlayerResponse = yield call(savePlayer, action.payload);
    yield put(PlayerAction.savePlayer.success(response));
    toast.success(action.payload.player.id === null ? 'Giocatore creato...' : 'Giocatore aggiornato...');
  } catch (err) {
    yield put(PlayerAction.savePlayer.failure(err));
  }
}

export const PlayersSagas = [
  takeEvery(PlayerAction.getPlayers.request, getPlayersSaga),
  takeEvery(PlayerAction.deletePlayers.request, deletePlayersSaga),
  takeEvery(PlayerAction.savePlayer.request, savePlayerSaga),
];
