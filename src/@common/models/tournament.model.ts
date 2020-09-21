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
  tournament: TournamentDTO;
  history: H.History<unknown>;
}

export interface UpdateTournamentRequest {
  tournament: TournamentDTO;
}

// Responses
export interface FetchTournamentsResponse extends GenericReponse {
  tournamentsList?: TournamentDTO[];
}
export interface SaveTournamentResponse extends GenericReponse {
  tournament: TournamentDTO | null;
}
export interface UpdateTournamentResponse extends GenericReponse {
  tournament: TournamentDTO;
}

//
// Error
export interface TournamentError extends GenericReponse {}
