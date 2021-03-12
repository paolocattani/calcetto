import * as H from 'history';
import i18next from 'i18next';
import { END, eventChannel } from 'redux-saga';
import { delay, put } from 'redux-saga/effects';
import { io, Socket } from 'socket.io-client';
import { socketHost } from 'src/@common/utils';
import { EventMessage, Events, Unauthorized } from '../../@common/models';
import { AuthAction } from '../actions';
import { getToast } from '../sagas/utils';
import { persistor } from '../store';

let socket: Socket;
function showMessageSocket({ label, type }: EventMessage) {
	getToast(type)(i18next.t(label.key, label.options));
}

// Create comunication channel
export const createSocketChannel = (thisSocket: Socket, history: H.History) =>
	eventChannel<EventMessage>((emitter) => {
		// Listen for error
		const errorListener = (event: Event) => {
			console.error('[ Event ] An Error Occur: ', event);
			emitter(END);
			closeConnection();
		};

		// Session Expired
		const onSessionExpired = function* (message: EventMessage) {
			showMessageSocket(message);
			yield delay(3000);
			yield put(AuthAction.logout.success(Unauthorized));
			history.push('/login');
			persistor.purge();
		};
		const onNewMessage = (message: EventMessage) => {
			showMessageSocket(message);
			emitter(message);
		};

		// Adds a listener that will be fired when any event is emitted
		thisSocket.prependAny((eventName, ...args) => {
			console.log('[ Event! ] : ', eventName, ...args);
		});

		// Handlers
		thisSocket.on(Events.NEW_MESSAGE, onNewMessage);
		thisSocket.on(Events.SESSION_EXPIRED, onSessionExpired);

		// Add listener
		thisSocket.on('error', errorListener);
		// Cleanup function
		const closeConnection = () => {
			// Remove listener
			thisSocket.off('error', errorListener);
			thisSocket.close();
		};
		return closeConnection;
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

export const reconnect = () => {
	socket = io(socketHost, { withCredentials: true });
	return new Promise((resolve) => {
		socket.on('reconnect', () => {
			console.log('[ Event! ] Reconnected');
			resolve(socket);
		});
	});
};

export function* emitEvent(event: Events, action: any, ...args: any) {
	try {
		console.log('[ Event ] Emitting event : ', event);
		socket.emit(event, ...args);
		yield put(action.success({}));
	} catch (error) {
		yield put(action.failure({}));
	}
}
