import { createAsyncAction } from 'typesafe-actions';
import { defaultAsyncParams } from './constants';
import {
	CloseChannelRequest,
	CloseChannelResponse,
	DeleteTournamentEventRequest,
	DeleteTournamentEventResponse,
	EventError,
	JoinTournamentEventRequest,
	JoinTournamentEventResponse,
	LeaveTournamentEventRequest,
	LeaveTournamentEventResponse,
	NewTournamentEventRequest,
	NewTournamentEventResponse,
	OpenChannelRequest,
	OpenChannelResponse,
	UpdateStage1EventRequest,
	UpdateStage1EventResponse,
	UpdateStage2EventRequest,
	UpdateStage2EventResponse,
	UpdateTournamentEventRequest,
	UpdateTournamentEventResponse,
} from '../../@common/models/event.model';

const actionName = '[Event]';
export const EventAction = {
	// fetch tournaments
	openChannel: createAsyncAction(...defaultAsyncParams(actionName, 'Open Channel'))<
		OpenChannelRequest,
		OpenChannelResponse,
		EventError
	>(),
	closeChannel: createAsyncAction(...defaultAsyncParams(actionName, 'Close Channel'))<
		CloseChannelRequest,
		CloseChannelResponse,
		EventError
	>(),
	joinTournament: createAsyncAction(...defaultAsyncParams(actionName, 'Join Tournament'))<
		JoinTournamentEventRequest,
		JoinTournamentEventResponse,
		EventError
	>(),
	leaveTournament: createAsyncAction(...defaultAsyncParams(actionName, 'Leave Tournament'))<
		LeaveTournamentEventRequest,
		LeaveTournamentEventResponse,
		EventError
	>(),
	newTournament: createAsyncAction(...defaultAsyncParams(actionName, 'New Tournament'))<
		NewTournamentEventRequest,
		NewTournamentEventResponse,
		EventError
	>(),
	updateTournament: createAsyncAction(...defaultAsyncParams(actionName, 'Update Tournament'))<
		UpdateTournamentEventRequest,
		UpdateTournamentEventResponse,
		EventError
	>(),
	deleteTournament: createAsyncAction(...defaultAsyncParams(actionName, 'Delete Tournament'))<
		DeleteTournamentEventRequest,
		DeleteTournamentEventResponse,
		EventError
	>(),
	updateStage1: createAsyncAction(...defaultAsyncParams(actionName, 'Update Stage1'))<
		UpdateStage1EventRequest,
		UpdateStage1EventResponse,
		EventError
	>(),
	updateStage2: createAsyncAction(...defaultAsyncParams(actionName, 'Update Stage2'))<
		UpdateStage2EventRequest,
		UpdateStage2EventResponse,
		EventError
	>(),
};
