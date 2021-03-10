import * as H from 'history';
import { call, delay, put, race, take, takeEvery } from '@redux-saga/core/effects';
import { cancelled, StrictEffect } from 'redux-saga/effects';
import { formatDate, socketHost } from '../../@common/utils';
import { EventAction } from '../actions/event.action';
import { buffers, END, eventChannel } from 'redux-saga';
import { Message, SessionStatus, Unauthorized, UserMessageType } from 'src/@common/models';
import { Events } from 'src/@common/models/event.model';
import i18next from '../../i18n/i18n';
import { getToast } from './utils';
import { AuthAction } from '../actions';
import { persistor } from '../store';
import { io, Socket } from 'socket.io-client';
import { tournament } from 'src/test/commons';

const showMessage = (message: Message, type: UserMessageType) => {
	if (message.label) {
		getToast(type)(
			i18next.t(
				message.label,
				message.data?.name && message.data?.date
					? { tournament: `${message.data.name}@${formatDate(message.data.date)}` }
					: undefined
			)
		);
	}
};

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
		console.log('-----> listenEvents Saga!!!! ');
		const { connected, timeout } = yield race({ connected: call(socketConnect), timeout: delay(20000) });
		// If timeout won the race then
		console.log('-----> timeout!!!! ', timeout);
		if (timeout) {
			yield put(EventAction.closeChannel.request({}));
		}
		socket = connected;
		console.log('-----> socket!!!! ', socket);
		const socketChannel = yield call(createSocketChannel, socket, history);
		console.log('-----> EventAction.openChannel.success!!!! ');
		yield put(EventAction.openChannel.success({ connected: true }));
		while (true) {
			const payload = yield take(socketChannel);
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
const createSocketChannel = (socket: Socket, history: H.History) =>
	eventChannel<Events>((emitter) => {
		// Listen for open channel
		const openListener = (event: Event) => console.log('Connected...');
		// Listen for error
		const errorListener = (event: Event) => {
			console.error('An Error Occur: ', event);
			emitter(END);
			closeConnection();
		};

		// Adds a listener that will be fired when any event is emitted
		socket.prependAny((eventName, ...args) => {
			console.log('Socket Event! : ', eventName, ...args);
		});
		socket.on(Events.SESSION_EXPIRED, (message: Message) => onSessionExpired(message, history));

		// Add listener
		socket.on('open', openListener);
		socket.on('error', errorListener);
		// Cleanup function
		const closeConnection = () => {
			// Remove listener
			socket.off('open', openListener);
			socket.off('error', errorListener);
			socket.close();
		};
		return closeConnection;
	}, buffers.expanding());

const onSessionExpired = function* (message: Message, history: H.History) {
	showMessage(message, UserMessageType.Danger);
	yield delay(3000);
	yield put(AuthAction.logout.success(Unauthorized));
	history.push('/login');
	persistor.purge();
};

export const EventSagas = [
	takeEvery(EventAction.openChannel.request, listenEvents),
	takeEvery(EventAction.joinTournament.request, joinTournament),
	takeEvery(EventAction.leaveTournament.request, leaveTournament),
];
