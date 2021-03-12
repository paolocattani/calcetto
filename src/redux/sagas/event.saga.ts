import * as H from 'history';
import { call, delay, put, race, take, takeEvery } from '@redux-saga/core/effects';
import { cancelled, StrictEffect } from 'redux-saga/effects';
import { socketHost } from '../../@common/utils';
import { EventAction } from '../actions/event.action';
import { END, eventChannel } from 'redux-saga';
import { EventMessage, Unauthorized } from '../../@common/models';
import { Events } from '../../@common/models/event.model';
import i18next from '../../i18n/i18n';
import { getToast } from './utils';
import { AuthAction } from '../actions';
import { persistor } from '../store';
import { io, Socket } from 'socket.io-client';

function showMessageSocket({ label, type }: EventMessage) {
	getToast(type)(i18next.t(label.key, label.options));
}

//-----------------------------------------------
let socket: Socket;

// Emit Events.TOURNAMENT_JOIN
function* joinTournament({ payload: { tournamentId } }: ReturnType<typeof EventAction.joinTournament.request>) {
	try {
		socket.emit(Events.TOURNAMENT_JOIN, tournamentId);
		yield put(EventAction.joinTournament.success({}));
	} catch (error) {
		yield put(EventAction.joinTournament.failure({}));
	}
}
// Emit Events.TOURNAMENT_LEAVE
function* leaveTournament({ payload: { tournamentId } }: ReturnType<typeof EventAction.leaveTournament.request>) {
	try {
		console.log('Leaving tournament');
		socket.emit(Events.TOURNAMENT_LEAVE, tournamentId);
		yield put(EventAction.leaveTournament.success({}));
	} catch (error) {
		yield put(EventAction.leaveTournament.failure({}));
	}
}

// Close socket channel
function* closeChannel({ payload }: ReturnType<typeof EventAction.closeChannel.request>) {
	try {
		yield put(EventAction.closeChannel.success({}));
	} catch (error) {
		yield put(EventAction.closeChannel.failure({}));
	}
}

// Listen socket events
function* listenEvents({
	payload: { history },
}: ReturnType<typeof EventAction.openChannel.request>): Generator<StrictEffect, void, any> {
	try {
		// Try to connect with 2sec timeout
		const { connected, timeout } = yield race({ connected: call(socketConnect), timeout: delay(20000) });
		// If timeout won the race then
		if (timeout) {
			yield put(EventAction.closeChannel.request({}));
		}
		socket = connected;
		const socketChannel = yield call(createSocketChannel, socket, history);
		console.log('-----> EventAction.openChannel.success!!!! ');
		yield put(EventAction.openChannel.success({ connected: true }));
		while (true) {
			yield take(socketChannel);
		}
	} catch (error) {
		// On error dispatch close channel
		console.error('-----> EventAction.closeChannel.request!!!! ', error);
		yield put(EventAction.closeChannel.request({}));
	} finally {
		console.error('-----> FINALLY EventAction.closeChannel.request!!!! ');
		if (yield cancelled()) {
			socket.disconnect();
			yield put(EventAction.closeChannel.request({}));
		}
	}
}

const socketConnect = () => {
	socket = io(socketHost, {
		withCredentials: true,
	});
	return new Promise((resolve) => {
		socket.on('connect', () => {
			console.log('SOCKET CONNECTED : ', socket.id);
			resolve(socket);
		});
	});
};

const reconnect = () => {
	socket = io(socketHost);
	return new Promise((resolve) => {
		socket.on('reconnect', () => {
			resolve(socket);
		});
	});
};

// Create comunication channel
const createSocketChannel = (thisSocket: Socket, history: H.History) =>
	eventChannel<EventMessage>((emitter) => {
		// Listen for open channel
		const openListener = (event: Event) => console.log('Connected...');
		// Listen for error
		const errorListener = (event: Event) => {
			console.error('An Error Occur: ', event);
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

		// Adds a listener that will be fired when any event is emitted
		thisSocket.prependAny((eventName, ...args) => {
			console.log('[ Event! ] : ', eventName, ...args);
		});

		// Show messages
		thisSocket.on('new_message', (message: EventMessage) => {
			showMessageSocket(message);
			emitter(message);
		});
		thisSocket.on(Events.SESSION_EXPIRED, (message: EventMessage) => onSessionExpired(message));

		// Add listener
		thisSocket.on('open', openListener);
		thisSocket.on('error', errorListener);
		// Cleanup function
		const closeConnection = () => {
			// Remove listener
			thisSocket.off('open', openListener);
			thisSocket.off('error', errorListener);
			thisSocket.close();
		};
		return closeConnection;
	});
//	}, buffers.expanding());

export const EventSagas = [
	takeEvery(EventAction.openChannel.request, listenEvents),
	takeEvery(EventAction.joinTournament.request, joinTournament),
	takeEvery(EventAction.leaveTournament.request, leaveTournament),
];
