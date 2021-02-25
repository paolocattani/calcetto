import * as H from 'history';
import { GenericResponse } from './common.models';
import { TournamentDTO } from '../dto';

//## STATE
export interface TournamentState {
	tournament: TournamentDTO | null;
	tournamentsList: Array<TournamentDTO>;
	isLoading: boolean;
}

export interface Redirect {
	history: H.History<unknown>;
	path: string;
}
//## REQUEST - RESPONSE - ERROR
// Requests
export interface ReloadTournamentRequest {
	tId: number;
	redirect?: Redirect;
}
export interface FetchTournamentsRequest {
	redirect?: {
		history: H.History<unknown>;
		path: string;
	};
}

export interface SaveTournamentRequest {
	tournament: TournamentDTO;
	history: H.History<unknown>;
}

export interface UpdateTournamentRequest {
	tournament: TournamentDTO;
}

export interface DeleteTournamentRequest {
	tournament: TournamentDTO;
}

// Responses
export interface FetchTournamentsResponse extends GenericResponse {
	tournamentsList?: Array<TournamentDTO>;
}
export interface SaveTournamentResponse extends GenericResponse {
	tournament: TournamentDTO | null;
}
export interface ReloadTournamentResponse extends GenericResponse {
	tournament: TournamentDTO;
}
export interface UpdateTournamentResponse extends GenericResponse {
	tournament: TournamentDTO;
}
export interface DeleteTournamentResponse extends GenericResponse {
	tournament: TournamentDTO;
}

//
// Error
export interface TournamentError extends GenericResponse {}
