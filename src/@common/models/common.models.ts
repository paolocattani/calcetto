import { PlayerRole, TournamentDTO } from '../dto';
import { AuthenticationResponse, Events, RootState } from '.';
import { HTTPStatusCode } from './HttpStatusCode';
import { TOptions, TFunctionKeys } from 'i18next';

export enum SessionStatus {
	//
	HEARTBEAT = 'heartbeat',
	// Sessione scaduta, reindirizza l'utente alla login
	SESSION_EXPIRED = 'session_expired',
	// Aggiornamento torneo
	TOURNAMENT_NEW = 'tournament_new',
	TOURNAMENT_UPDATE = 'tournament_update',
	TOURNAMENT_DELETE = 'tournament_delete',
	// Aggiornamento dati su Stage1
	STAGE1_UPDATE = 'stage1_update',
	STAGE1_DELETE = 'stage1_delete',
	// Aggiornamento dati su Stage2
	STAGE2_UPDATE = 'stage2_update',
	STAGE2_DELETE = 'stage2_delete',
}

export interface EventMessage {
	event: Events;
	type: UserMessageType;
	label: I18nLabel;
	data?: {
		tournament: TournamentDTO;
	};
}

/**
 * @deprecated
 */
export interface Message {
	status: SessionStatus;
	data?: {
		tournamentId?: number;
		name?: string;
		date?: Date;
	};
	label?: string;
}

export type I18nLabel = {
	key: TFunctionKeys | TFunctionKeys[];
	options?: TOptions<{ [key: string]: any }> | string;
};

export enum Environment {
	development = 'development',
	test = 'test',
	production = 'production',
}

export interface GenericResponse {
	code: HTTPStatusCode;
	message: string;
	userMessage: UserMessage;
}

export enum UserMessageType {
	Success = 'success',
	Warning = 'warning',
	Danger = 'danger',
}

export interface UserMessage {
	type: UserMessageType;
	label: I18nLabel;
}

export type OmitHistory<T> = Omit<T, 'history'>;
export type OmitGeneric<T extends GenericResponse> = Omit<T, 'code' | 'message' | 'userMessage'>;
export type PickGeneric<T extends GenericResponse> = Pick<T, 'code' | 'message' | 'userMessage'>;

export const UnexpectedServerError: GenericResponse = {
	code: HTTPStatusCode.InternalServerError,
	message: 'Unexpected Server Error',
	userMessage: {
		type: UserMessageType.Danger,
		label: { key: 'common:server.unexpected' },
	},
};

export const Unauthorized: AuthenticationResponse = {
	user: undefined,
	code: HTTPStatusCode.Unauthorized,
	message: 'Unauthorized!',
	userMessage: {
		type: UserMessageType.Danger,
		label: { key: 'auth:expired' },
	},
};

export const initialState: RootState = {
	statsState: {
		isLoading: false,
	},
	tournamentState: {
		tournament: null,
		tournamentsList: [],
		isLoading: false,
	},
	playerState: {
		isLoading: false,
		playersList: [],
		isSaving: false,
	},
	pairState: {
		isLoading: false,
		isSaving: false,
	},
	authState: {
		isAuthenticated: false,
		isAdmin: false,
		isLoading: false,
	},
	eventState: {
		connected: false,
	},
	stage1State: {
		toogleRefresh: false,
		selectedPairs: [
			{
				id: null,
				tournamentId: 0,
				rowNumber: 0,
				player1: {
					id: null,
					name: '',
					surname: '',
					alias: '',
					label: '',
					role: PlayerRole.GoalKeeper,
					email: '',
					phone: '',
					match_played: 0,
					match_won: 0,
					total_score: 0,
					editable: false,
					rowNumber: 0,
				},
				player2: {
					id: null,
					name: '',
					surname: '',
					alias: '',
					label: '',
					role: PlayerRole.GoalKeeper,
					email: '',
					phone: '',
					match_played: 0,
					match_won: 0,
					total_score: 0,
					editable: false,
					rowNumber: 0,
				},
				alias: '-',
				stage1Name: '',
				placement: 0,
				paid1: false,
				paid2: false,
			},
		],
		isLoading: false,
		stages: [],
	},
	stage2State: {
		toogleRefresh: true,
		isLoading: false,
	},
};
