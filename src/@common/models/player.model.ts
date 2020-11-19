import * as H from 'history';
import { PlayerDTO } from '../dto';
import { GenericReponse } from './common.models';
//
export interface PlayerState {
  player?: PlayerDTO;
  playersList: Array<PlayerDTO>;
  isLoading: boolean;
  isSaving: boolean;
}

// Requests
export interface FetchPlayersRequest {
  tId?: number;
  addEmpty?: boolean;
}
export interface SavePlayerRequest {
  history?: H.History<unknown>;
  player: PlayerDTO;
}
export interface DeletePlayersRequest {
  history?: H.History<unknown>;
  players: Array<PlayerDTO>;
}
// Responses
export interface FetchPlayersResponse extends GenericReponse {
  playersList: Array<PlayerDTO>;
}
export interface SavePlayerResponse extends GenericReponse {
  player: PlayerDTO;
}
export interface DeletePlayersResponse extends GenericReponse {
  playersList: Array<PlayerDTO>;
}

export interface PlayerError extends GenericReponse {}
