import { Action } from 'redux';
import { createReducer } from 'typesafe-actions';
import { EventState } from '../../@common/models/event.model';
import { EventAction } from '../actions/event.action';

export const initialEventState: EventState = {
	connected: false,
};

export const EventReducer = createReducer<EventState, Action>(initialEventState)
	// Request
	.handleAction([EventAction.openChannel.request], (state) => ({ connected: false }))
	// Failure
	.handleAction([EventAction.openChannel.failure], (state) => ({ connected: false }))
	// Success
	.handleAction([EventAction.openChannel.failure], (state) => ({ connected: true }));
