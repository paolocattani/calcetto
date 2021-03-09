import { createAsyncAction } from 'typesafe-actions';
import { defaultAsyncParams } from './constants';
import {
	CloseChannelRequest,
	CloseChannelResponse,
	EventError,
	OpenChannelRequest,
	OpenChannelResponse,
} from 'src/@common/models/event.model';

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
};
