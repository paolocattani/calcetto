import { createAsyncAction, createAction } from 'typesafe-actions';
import { defaultAsyncParams, PurgeResponse, PURGE_STORE_ACTION } from './constants';
import {
  FetchPlayersResponse,
  FetchPlayersRequest,
  UpdatePlayerRequest,
  UpdatePlayerResponse,
  DeletePlayersResponse,
  DeletePlayersRequest,
} from '@common/models/player.model';

const actionName = '[Player]';
export const PlayerAction = {
  // fetch tournaments
  fetchPlayers: createAsyncAction(...defaultAsyncParams(actionName, 'Fetch Palyers'))<
    FetchPlayersRequest,
    FetchPlayersResponse,
    Error
  >(),
  savePlayer: createAsyncAction(...defaultAsyncParams(actionName, 'Save Player'))<
    UpdatePlayerRequest,
    UpdatePlayerResponse,
    Error
  >(),
  deletePlayers: createAsyncAction(...defaultAsyncParams(actionName, 'Delete Player'))<
    DeletePlayersRequest,
    DeletePlayersResponse,
    Error
  >(),
  purge: createAction(PURGE_STORE_ACTION)<PurgeResponse>(),
};
