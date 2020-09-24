import * as H from 'history';
import { PlayerDTO } from '@common/dto';
import { GenericReponse } from './common.models';
//
export interface PlayerState {
  player?: PlayerDTO;
  playersList: PlayerDTO[];
  isLoading: boolean;
  isSaving: boolean;
}

// Requests
export interface FetchPlayersRequest {
  tId?: number;
  addEmpty?: boolean;
}
export interface UpdatePlayerRequest {
  history?: H.History<unknown>;
  player: PlayerDTO;
}
export interface DeletePlayersRequest {
  history?: H.History<unknown>;
  players: PlayerDTO[];
}
// Responses
export interface FetchPlayersResponse extends GenericReponse {
  playersList: PlayerDTO[];
}
export interface UpdatePlayerResponse extends GenericReponse {
  player: PlayerDTO;
}
export interface DeletePlayersResponse extends GenericReponse {
  playersList: PlayerDTO[];
}

export interface PlayerError extends GenericReponse {}
