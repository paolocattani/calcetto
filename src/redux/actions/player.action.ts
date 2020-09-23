import { createAsyncAction, createAction } from 'typesafe-actions';
import { defaultAsyncParams, PurgeResponse, PURGE_STORE_ACTION } from './constants';
import {
  FetchPlayersResponse,
  FetchPlayersRequest,
  UpdatePlayerRequest,
  UpdatePlayerResponse,
  DeletePlayersResponse,
  DeletePlayersRequest,
  PlayerError,
} from '@common/models/player.model';

const actionName = '[Player]';
export const PlayerAction = {
  // fetch tournaments
  fetchPlayers: createAsyncAction(...defaultAsyncParams(actionName, 'Fetch Palyers'))<
    FetchPlayersRequest,
    FetchPlayersResponse,
    PlayerError
  >(),
  savePlayer: createAsyncAction(...defaultAsyncParams(actionName, 'Save Player'))<
    UpdatePlayerRequest,
    UpdatePlayerResponse,
    PlayerError
  >(),
  updatePlayer: createAsyncAction(...defaultAsyncParams(actionName, 'Save Player'))<
    UpdatePlayerRequest,
    UpdatePlayerResponse,
    PlayerError
  >(),
  deletePlayers: createAsyncAction(...defaultAsyncParams(actionName, 'Delete Player'))<
    DeletePlayersRequest,
    DeletePlayersResponse,
    PlayerError
  >(),
  purge: createAction(PURGE_STORE_ACTION)<PurgeResponse>(),
};
