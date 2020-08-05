import { createAsyncAction } from 'typesafe-actions';
import { Failure, Success, Request } from './constants';
import {
  FetchPlayersResponse,
  FetchPlayersRequest,
  UpdatePlayerRequest,
  UpdatePlayerResponse,
  DeletePlayersResponse,
  DeletePlayersRequest,
} from 'models/player.model';

const ActionName = '[Player]';
export const PlayerAction = {
  // fetch tournaments
  getPlayers: createAsyncAction(
    `${ActionName} Get Player ${Request}`,
    `${ActionName} Get Player ${Success}`,
    `${ActionName} Get Player ${Failure}`
  )<FetchPlayersRequest, FetchPlayersResponse, Error>(),
  savePlayer: createAsyncAction(
    `${ActionName} Save Player ${Request}`,
    `${ActionName} Save Player ${Success}`,
    `${ActionName} Save Player ${Failure}`
  )<UpdatePlayerRequest, UpdatePlayerResponse, Error>(),
  deletePlayers: createAsyncAction(
    `${ActionName} Delete Players ${Request}`,
    `${ActionName} Delete Players ${Success}`,
    `${ActionName} Delete Players ${Failure}`
  )<DeletePlayersRequest, DeletePlayersResponse, Error>(),
};
