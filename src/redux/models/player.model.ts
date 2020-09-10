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
}

export interface PlayerDTO {
  id: number | null;
  name: string;
  surname: string;
  alias: string;
  label: string;
  role: PlayerRole;
  email: string;
  phone: string;
  userId?: number;
  match_played?: number;
  match_won?: number;
  total_score?: number;
  editable: boolean;
  rowNumber: number;
}

export enum PlayerRole {
  NotAPlayer = 'Non sono un giocatore',
  GoalKeeper = 'Portiere',
  Master = 'Master',
  Striker = 'Attaccante',
}
