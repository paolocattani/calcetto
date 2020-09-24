import {
  DeletePlayersRequest,
  DeletePlayersResponse,
  FetchPlayersRequest,
  FetchPlayersResponse,
  UpdatePlayerRequest,
  UpdatePlayerResponse,
} from '@common/models';
import { StrictEffect, takeEvery } from 'redux-saga/effects';
import { PlayerAction } from 'redux/actions/player.action';
import { fetchPlayers, deletePlayers, savePlayer, updatePlayer } from 'redux/services/player.service';
import { entityLifeCycle } from './utils';

const back = (payload: DeletePlayersRequest | UpdatePlayerRequest) => payload.history?.push('/player');

function* getPlayersSaga({
  payload,
}: ReturnType<typeof PlayerAction.fetchPlayers.request>): Generator<StrictEffect, void, any> {
  yield entityLifeCycle<FetchPlayersRequest, FetchPlayersResponse>(PlayerAction.fetchPlayers, fetchPlayers, payload);
}

function* deletePlayersSaga({
  payload,
}: ReturnType<typeof PlayerAction.deletePlayers.request>): Generator<StrictEffect, void, any> {
  yield entityLifeCycle<DeletePlayersRequest, DeletePlayersResponse>(
    PlayerAction.deletePlayers,
    deletePlayers,
    payload,
    () => back(payload)
  );
}

function* savePlayerSaga({
  payload,
}: ReturnType<typeof PlayerAction.savePlayer.request>): Generator<StrictEffect, void, any> {
  yield entityLifeCycle<UpdatePlayerRequest, UpdatePlayerResponse>(PlayerAction.updatePlayer, savePlayer, payload, () =>
    back(payload)
  );
}

function* updatePlayerSaga({
  payload,
}: ReturnType<typeof PlayerAction.updatePlayer.request>): Generator<StrictEffect, void, any> {
  yield entityLifeCycle<UpdatePlayerRequest, UpdatePlayerResponse>(
    PlayerAction.updatePlayer,
    updatePlayer,
    payload,
    () => back(payload)
  );
}

export const PlayersSagas = [
  takeEvery(PlayerAction.fetchPlayers.request, getPlayersSaga),
  takeEvery(PlayerAction.deletePlayers.request, deletePlayersSaga),
  takeEvery(PlayerAction.savePlayer.request, savePlayerSaga),
  takeEvery(PlayerAction.updatePlayer.request, updatePlayerSaga),
];
