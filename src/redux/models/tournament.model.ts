import * as H from 'history';
import { GenericReponse } from './common.model';

// Requests
export interface FetchTournamentsRequest {
  tId?: number;
}

export interface SaveTournamentRequest {
  model: TournamentDTO;
  history: H.History<unknown>;
}

export interface UpdateTournamentRequest {
  model: TournamentDTO;
}

export interface IsValidTournamentRequest {
  model: TournamentDTO;
}

// Responses
export interface FetchTournamentsResponse {
  results: TournamentDTO[];
}
export interface SaveTournamentResponse extends GenericReponse {
  tournament: TournamentDTO | null;
}
export interface UpdateTournamentResponse extends GenericReponse {
  tournament: TournamentDTO;
}
export interface IsValidTournamentResponse {
  isValid: boolean;
  errorMessage: string;
}

//
// Error
export interface TournamentError extends GenericReponse {}

export interface TournamentState {
  tournament: TournamentDTO | null;
  tournamentsList: TournamentDTO[] | [];
  isLoading: boolean;
}

export interface TournamentDTO {
  id: number | null;
  name: string;
  date: Date;
  progress: TournamentProgress;
  public: boolean;
  autoOrder: boolean;
  label: string;
  ownerId: number | null;
}

export enum TournamentProgress {
  New = 'new',
  PairsSelection = 'pairsSelection',
  Stage1 = 'stage1',
  Stage2 = 'stage2',
}
