import { createAsyncAction, createAction } from 'typesafe-actions';
import { defaultAsyncParams, defaultParam, PurgeResponse, PURGE_STORE_ACTION } from './constants';
import {
  FetchPlayersResponse,
  FetchPlayersRequest,
  SavePlayerRequest,
  SavePlayerResponse,
  DeletePlayersResponse,
  DeletePlayersRequest,
  PlayerError,
} from '@common/models/player.model';
import { PlayerDTO } from '@common/dto';

const actionName = '[Player]';
export const PlayerAction = {
  // set selected tournament
  setPlayer: createAction(...defaultParam(actionName, 'Set Player'))<PlayerDTO>(),
  // fetch tournaments
  fetchPlayers: createAsyncAction(...defaultAsyncParams(actionName, 'Fetch Palyers'))<
    FetchPlayersRequest,
    FetchPlayersResponse,
    PlayerError
  >(),
  savePlayer: createAsyncAction(...defaultAsyncParams(actionName, 'Save Player'))<
    SavePlayerRequest,
    SavePlayerResponse,
    PlayerError
  >(),
  updatePlayer: createAsyncAction(...defaultAsyncParams(actionName, 'Update Player'))<
    SavePlayerRequest,
    SavePlayerResponse,
    PlayerError
  >(),
  deletePlayers: createAsyncAction(...defaultAsyncParams(actionName, 'Delete Player'))<
    DeletePlayersRequest,
    DeletePlayersResponse,
    PlayerError
  >(),
  purge: createAction(PURGE_STORE_ACTION)<PurgeResponse>(),
};
