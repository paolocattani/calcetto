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
	 * This event is fired from client when the user session expired
	 * #From : Server
	 * The user is forced to logout.
	 */
	SESSION_EXPIRED = 'session:expired',
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
	 * #From : Client
	 * #To : All client ( user and admin )
	 * See EventAction.updateTournament
	 */
	TOURNAMENT_UPDATED = 'tournament:updated',
	/**
	 *
	 * This event is fired when clients have to reload tournament list
	 * #From : Server
	 * #To : All client ( user and admin )
	 * See EventAction.updateTournament
	 */
	TOURNAMENT_REFRESH = 'tournament:refresh',
	// Stage1
	STAGE1_UPDATE = 'stage1:update',
	STAGE1_DELETE = 'stage1:delete',
	// Stage2
	STAGE2_UPDATE = 'stage2:update',
	STAGE2_DELETE = 'stage2:delete',
}

//----- Client / Server Events
export interface ClientToServerEvents {
	[Events.TOURNAMENT_JOIN]: (tournament: TournamentDTO) => void;
	[Events.TOURNAMENT_LEAVE]: (tournament: TournamentDTO) => void;
	[Events.TOURNAMENT_NEW]: (tournament: TournamentDTO) => void;
	[Events.TOURNAMENT_DELETED]: (tournament: TournamentDTO) => void;
	[Events.TOURNAMENT_UPDATED]: (tournament: TournamentDTO) => void;
}

export interface ServerToClientEvents {
	[Events.NEW_MESSAGE]: (message: EventMessage) => void;
	[Events.SESSION_EXPIRED]: (message: EventMessage) => void;
	[Events.TOURNAMENT_REFRESH]: (message: EventMessage) => void;
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
export interface JoinTournamentEventRequest extends TournamentEvent {}
export interface LeaveTournamentEventRequest extends TournamentEvent {}
export interface NewTournamentEventRequest extends TournamentEvent {}
export interface UpdateTournamentEventRequest extends TournamentEvent {}
export interface DeleteTournamentEventRequest extends TournamentEvent {}

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

// Error
export interface EventError {}
