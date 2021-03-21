import * as H from 'history';
import { EventMessage } from '.';
import { TournamentDTO } from '../dto';

// Client Event state
export interface EventState {
	connected: boolean;
}

// Event keys
export enum Events {
	/**
	 * This event is fired to broadcast message to client
	 * #From : Server
	 */
	NEW_MESSAGE = 'new_message',
	/**
	 * This event is fired from server when the user session expired
	 * #From : Server
	 * The user is forced to logout.
	 */
	SESSION_EXPIRED = 'session:expired',
	/**
	 * This event is fired from client when the user logout
	 * #From : Server
	 */
	LOGOUT = 'session:logout',
	DISCONNECT = 'disconnect',
	CONNECTION = 'connection',
	/**
	 * This event is fired when a user join tournament room.
	 * #From : Client
	 * #To : All client ( user and admin ) inside tournament room
	 * See EventAction.joinTournament
	 */
	TOURNAMENT_JOIN = 'tournament:join',
	/**
	 * This event is fired when a user leave tournament room.
	 * #From : Client
	 * #To : All client ( user and admin ) inside tournament room
	 * See EventAction.leaveTournament
	 */
	TOURNAMENT_LEAVE = 'tournament:leave',
	/**
	 * This event is fired when a public tournament move to TournamentProgress.Stage1
	 * #From : Client
	 * #To : All client ( user and admin )
	 * See EventAction.newTournament
	 */
	TOURNAMENT_NEW = 'tournament:new',
	/**
	 *
	 * This event is fired when a public Tournament regresses to TournamentProgress.PairsSelection
	 * #From : Client
	 * #To : All client ( user and admin )
	 * See EventAction.deleteTournament
	 */
	TOURNAMENT_DELETED = 'tournament:deleted',
	/**
	 *
	 * This event is fired when a public Tournament change progress
	 * ( Stage1 -> Stage2 || Stage2 -> Stage1 )
	 * #From : Client
	 * #To : Server ( then server fires TOURNAMENT_REFRESH )
	 * See EventAction.updateTournament
	 */
	TOURNAMENT_UPDATED = 'tournament:updated',
	TOURNAMENT_REFRESH = 'tournament:refresh',
	/**
	 * Stage1
	 * This event is fired when an admin client edit stage1
	 * #From : Client
	 * #To : Server ( then server fires STAGE1_REFRESH )
	 *
	 */
	STAGE1_UPDATED = 'stage1:updated',
	STAGE1_REFRESH = 'stage1:refresh',
	/**
	 *
	 * Stage2
	 * This event is fired when an admin client edit stage2
	 * #From : Client
	 * #To : Server ( then server fires STAGE2_REFRESH )
	 *
	 */
	STAGE2_UPDATED = 'stage2:updated',
	STAGE2_REFRESH = 'stage2:refresh',
}

//----- Client / Server Events
export interface ClientToServerEvents {
	[Events.TOURNAMENT_JOIN]: (tournament: TournamentDTO) => void;
	[Events.TOURNAMENT_LEAVE]: (tournament: TournamentDTO) => void;
	[Events.TOURNAMENT_NEW]: (tournament: TournamentDTO) => void;
	[Events.TOURNAMENT_DELETED]: (tournament: TournamentDTO) => void;
	[Events.TOURNAMENT_UPDATED]: (tournament: TournamentDTO) => void;
	[Events.STAGE1_UPDATED]: (tournament: TournamentDTO) => void;
	[Events.STAGE2_UPDATED]: (tournament: TournamentDTO) => void;
	[Events.LOGOUT]: () => void;
}

export interface ServerToClientEvents {
	[Events.NEW_MESSAGE]: (message: EventMessage) => void;
	[Events.SESSION_EXPIRED]: (message: EventMessage) => void;
	[Events.TOURNAMENT_REFRESH]: (message: EventMessage) => void;
	[Events.STAGE1_REFRESH]: (message: EventMessage, tournament: TournamentDTO) => void;
	[Events.STAGE2_REFRESH]: (message: EventMessage, tournament: TournamentDTO) => void;
}

//----- Sagas
// Requests
export interface OpenChannelRequest {
	history: H.History;
}
interface TournamentEvent {
	tournament: TournamentDTO;
}
export interface CloseChannelRequest {}
export type JoinTournamentEventRequest = TournamentEvent;
export type LeaveTournamentEventRequest = TournamentEvent;
export type NewTournamentEventRequest = TournamentEvent;
export type UpdateTournamentEventRequest = TournamentEvent;
export type DeleteTournamentEventRequest = TournamentEvent;
export type UpdateStage1EventRequest = TournamentEvent;
export type UpdateStage2EventRequest = TournamentEvent;

// Responses
export interface OpenChannelResponse {
	connected: boolean;
}
export interface CloseChannelResponse {}
export interface JoinTournamentEventResponse {}
export interface LeaveTournamentEventResponse {}
export interface NewTournamentEventResponse {}
export interface UpdateTournamentEventResponse {}
export interface DeleteTournamentEventResponse {}
export interface UpdateStage1EventResponse {}
export interface UpdateStage2EventResponse {}

// Error
export interface EventError {}
