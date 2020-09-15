import * as H from 'history';
import { GenericReponse } from '@common/models/common.models';
import { TournamentDTO } from '@common/dto';

//## STATE
export interface TournamentState {
  tournament: TournamentDTO | null;
  tournamentsList: TournamentDTO[] | [];
  isLoading: boolean;
}

//## REQUEST - RESPONSE - ERROR
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
