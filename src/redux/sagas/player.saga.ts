import {
	DeletePlayersRequest,
	DeletePlayersResponse,
	FetchPlayersRequest,
	FetchPlayersResponse,
	PlayerError,
	SavePlayerRequest,
	SavePlayerResponse,
} from '../../@common/models';
import { takeEvery } from 'redux-saga/effects';
import { PlayerAction } from '../actions/player.action';
import { fetchPlayers, deletePlayers, savePlayer, updatePlayer } from '../services/player.service';
import { entityLifeCycle } from './utils';

const back = (payload: DeletePlayersRequest | SavePlayerRequest) => payload.history?.push('/player');

function* getPlayersSaga({ payload }: ReturnType<typeof PlayerAction.fetchPlayers.request>) {
	yield* entityLifeCycle<FetchPlayersRequest, FetchPlayersResponse, PlayerError>(
		PlayerAction.fetchPlayers,
		fetchPlayers,
		payload
	);
}

function* deletePlayersSaga({ payload }: ReturnType<typeof PlayerAction.deletePlayers.request>) {
	yield* entityLifeCycle<DeletePlayersRequest, DeletePlayersResponse, PlayerError>(
		PlayerAction.deletePlayers,
		deletePlayers,
		payload,
		() => back(payload)
	);
}

function* savePlayerSaga({ payload }: ReturnType<typeof PlayerAction.savePlayer.request>) {
	yield* entityLifeCycle<SavePlayerRequest, SavePlayerResponse, PlayerError>(
		PlayerAction.savePlayer,
		savePlayer,
		payload,
		() => back(payload)
	);
}

function* updatePlayerSaga({ payload }: ReturnType<typeof PlayerAction.updatePlayer.request>) {
	yield* entityLifeCycle<SavePlayerRequest, SavePlayerResponse, PlayerError>(
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
