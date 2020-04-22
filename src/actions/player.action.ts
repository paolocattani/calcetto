import { createAsyncAction } from 'typesafe-actions';
import { Failure, Success, Request } from './constants';
import { FetchPlayersResponse, FetchPlayersRequest } from 'models/player.model';

const ActionName = '[Player]';

export const PlayerAction = {
  // fetch tournaments
  getPlayers: createAsyncAction(
    `${ActionName} Get Player ${Request}`,
    `${ActionName} Get Player ${Success}`,
    `${ActionName} Get Player ${Failure}`
  )<FetchPlayersRequest, FetchPlayersResponse, Error>(),
};
