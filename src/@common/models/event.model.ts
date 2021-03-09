import * as H from 'history';
//
export interface EventState {
	connected: boolean;
}

// Events
export enum Events {
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
// Responses
export interface OpenChannelResponse {
	connected: boolean;
}
export interface CloseChannelResponse {}

// Error
export interface EventError {}
