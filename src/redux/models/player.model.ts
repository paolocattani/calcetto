import { PlayerDTO } from '@common/dto';

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
export interface FetchPlayersResponse {
  results: PlayerDTO[];
}
export interface UpdatePlayerResponse {
  player: PlayerDTO;
}
export interface DeletePlayersResponse {
  players: PlayerDTO[];
}

//
export interface PlayerState {
  player?: PlayerDTO;
  playersList: PlayerDTO[];
  isLoading: boolean;
  isSaving: boolean;
}
