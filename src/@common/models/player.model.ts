import * as H from 'history';
import { PlayerDTO, PlayerRole } from '../dto';
import { GenericResponse } from './common.models';
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
	history?: H.History;
	player: PlayerDTO;
}
export interface DeletePlayersRequest {
	history?: H.History;
	players: Array<PlayerDTO>;
}
// Responses
export interface FetchPlayersResponse extends GenericResponse {
	playersList: Array<PlayerDTO>;
}
export interface SavePlayerResponse extends GenericResponse {
	player: PlayerDTO;
}
export interface DeletePlayersResponse extends GenericResponse {
	playersList: Array<PlayerDTO>;
}

export interface PlayerError extends GenericResponse {}

export const getEmptyPlayer = (label?: string): PlayerDTO => ({
	id: null,
	name: '',
	surname: '',
	alias: '',
	label: label || '',
	role: PlayerRole.GoalKeeper,
	email: '',
	phone: '',
	match_played: 0,
	match_won: 0,
	total_score: 0,
	editable: false,
	rowNumber: 0,
});
