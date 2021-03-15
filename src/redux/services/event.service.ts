import * as H from 'history';
import i18next from 'i18next';
import { eventChannel } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { io, Socket } from 'socket.io-client';
import { socketHost } from 'src/@common/utils';
import { ClientToServerEvents, EventMessage, Events, ServerToClientEvents } from '../../@common/models';
import { getToast } from '../sagas/utils';

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;
function showMessageSocket({ label, type }: EventMessage) {
	getToast(type)(i18next.t(label.key, label.options));
}

// Create comunication channel
export const createSocketChannel = (thisSocket: Socket, history: H.History) =>
	eventChannel<EventMessage>((emitter) => {
		// Listen for error
		// Session Expired
		const onNewMessage = (message: EventMessage) => {
			showMessageSocket(message);
			emitter(message);
		};

		// Adds a listener that will be fired when any event is emitted
		thisSocket.prependAny((eventName, message: EventMessage, ...args) => {
			console.log('[ Event! ] : ', eventName, message, ...args);
			if (eventName !== Events.NEW_MESSAGE) {
				showMessageSocket(message);
			}
		});

		// Handlers
		thisSocket.on(Events.NEW_MESSAGE, onNewMessage);
		thisSocket.on(Events.SESSION_EXPIRED, emitter);
		thisSocket.on(Events.TOURNAMENT_REFRESH, emitter);

		return () => {
			// Remove listener
			thisSocket.off();
			thisSocket.close();
		};
	});

export const socketConnect = () => {
	socket = io(socketHost, { withCredentials: true });
	return new Promise((resolve) => {
		socket.on('connect', () => {
			console.log('[ Event! ] Connected');
			resolve(socket);
		});
	});
};

export function* emitEvent(event: keyof ClientToServerEvents, action: any, ...args: any) {
	try {
		console.log('[ Event ] Emitting event : ', event);
		socket.emit(event, ...args);
		yield put(action.success({}));
	} catch (error) {
		yield put(action.failure({}));
	}
}
