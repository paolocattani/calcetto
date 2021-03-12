import * as H from 'history';
//
export interface EventState {
	connected: boolean;
}

// Events
export enum Events {
	NEW_MESSAGE = 'new_message',
	// Session
	SESSION_EXPIRED = 'session:expired',
	// Tournament
	TOURNAMENT_JOIN = 'tournament:join',
	TOURNAMENT_LEAVE = 'tournament:leave',
	TOURNAMENT_NEW = 'tournament:new',
	// Stage1
	STAGE1_UPDATE = 'stage1:update',
	STAGE1_DELETE = 'stage1:delete',
	// Stage2
	STAGE2_UPDATE = 'stage2:update',
	STAGE2_DELETE = 'stage2:delete',
}

// Requests
export interface OpenChannelRequest {
	history: H.History;
}
export interface CloseChannelRequest {}
export interface JoinTournamentRequest {
	tournamentId: number;
}
export interface LeaveTournamentRequest {
	tournamentId: number;
}

// Responses
export interface OpenChannelResponse {
	connected: boolean;
}
export interface CloseChannelResponse {}
export interface JoinTournamentResponse {}
export interface LeaveTournamentResponse {}

// Error
export interface EventError {}
