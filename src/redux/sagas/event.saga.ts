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
let socket: SocketIOClient.Socket;

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
		const { connected, timeout } = yield race({ connected: call(socketConnect), timeout: delay(2000) });
		// If timeout won the race then
		if (timeout) {
			yield put(EventAction.closeChannel.request({}));
		}
		socket = connected;
		const socketChannel = yield call(createSocketChannel, socket, history);
		yield put(EventAction.openChannel.success({ connected: true }));
		while (true) {
			const payload = yield take(socketChannel);
		}
	} catch (error) {
		// On error dispatch close channel
		yield put(EventAction.closeChannel.request({}));
	} finally {
		if (yield cancelled()) {
			socket.disconnect();
			yield put(EventAction.closeChannel.request({}));
		}
	}
}

const socketConnect = () => {
	socket = io(socketHost);
	return new Promise((resolve) => {
		socket.on('connect', () => {
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
const createSocketChannel = (socket: SocketIOClient.Socket, history: H.History) =>
	eventChannel<Events>((emitter) => {
		// Listen for open channel
		const openListener = (event: Event) => console.log('Connected...');
		// Listen for error
		const errorListener = (event: Event) => {
			console.error('An Error Occur: ', event);
			emitter(END);
			closeConnection();
		};

		socket.on(Events.SESSION_EXPIRED, (message: Message) => onSessionExpired(message, history));
		socket.on(Events.SESSION_EXPIRED, (message: Message) => onSessionExpired(message, history));

		// Add listener
		socket.addEventListener('open', openListener);
		socket.addEventListener('error', errorListener);
		// Cleanup function
		const closeConnection = () => {
			// Remove listener
			socket.removeEventListener('open', openListener);
			socket.removeEventListener('message', messageListener);
			socket.removeEventListener('error', errorListener);
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

export const EventSagas = [takeEvery(EventAction.openChannel.request, listenEvents)];
