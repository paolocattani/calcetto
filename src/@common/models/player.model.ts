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
  player: PlayerDTO;
}
export interface DeletePlayersRequest {
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
