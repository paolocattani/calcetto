import { DeletePlayersResponse, FetchPlayersResponse, UpdatePlayerResponse } from '@common/models';
import { StrictEffect, takeEvery } from 'redux-saga/effects';
import { PlayerAction } from 'redux/actions/player.action';
import { fetchPlayers, deletePlayers, savePlayer, updatePlayer } from 'redux/services/player.service';
import { entityLifeCicle } from './utils';

function* getPlayersSaga({
  payload,
}: ReturnType<typeof PlayerAction.fetchPlayers.request>): Generator<StrictEffect, void, any> {
  yield entityLifeCicle<FetchPlayersResponse>(
    PlayerAction.fetchPlayers,
    fetchPlayers,
    payload,
    'Giocatori caricati...',
    'Errore in fase di caricamento...'
  );
}

function* deletePlayersSaga({
  payload,
}: ReturnType<typeof PlayerAction.deletePlayers.request>): Generator<StrictEffect, void, any> {
  yield entityLifeCicle<DeletePlayersResponse>(
    PlayerAction.deletePlayers,
    deletePlayers,
    payload,
    payload.players.length > 1 ? 'Giocatori creati...' : 'Giocatore creato...',
    'Errore in fase di eliminazione...'
  );
}

function* savePlayerSaga({
  payload,
}: ReturnType<typeof PlayerAction.savePlayer.request>): Generator<StrictEffect, void, any> {
  yield entityLifeCicle<UpdatePlayerResponse>(
    PlayerAction.updatePlayer,
    savePlayer,
    payload,
    'Giocatore creato...',
    'Errore in fase di salvataggio...'
  );
}

function* updatePlayerSaga({
  payload,
}: ReturnType<typeof PlayerAction.updatePlayer.request>): Generator<StrictEffect, void, any> {
  yield entityLifeCicle<UpdatePlayerResponse>(
    PlayerAction.updatePlayer,
    updatePlayer,
    payload,
    'Giocatore aggiornato...',
    'Errore in fase di salvataggio...'
  );
}

export const PlayersSagas = [
  takeEvery(PlayerAction.fetchPlayers.request, getPlayersSaga),
  takeEvery(PlayerAction.deletePlayers.request, deletePlayersSaga),
  takeEvery(PlayerAction.savePlayer.request, savePlayerSaga),
  takeEvery(PlayerAction.updatePlayer.request, updatePlayerSaga),
];
