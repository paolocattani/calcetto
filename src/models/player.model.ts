// Requests
export interface FetchPlayersRequest {
  tId?: number;
  addEmpty: boolean;
}
// Responses
export interface FetchPlayersResponse {
  results: PlayerDTO[];
}

export interface PlayerState {
  player?: PlayerDTO;
  playerList?: PlayerDTO[];
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
}

export enum PlayerRole {
  GoalKeeper = 'Portiere',
  Master = 'Master',
  Striker = 'Attaccante',
}
