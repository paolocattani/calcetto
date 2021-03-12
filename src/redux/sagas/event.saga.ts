import { call, delay, put, race, take, takeEvery } from '@redux-saga/core/effects';
import { cancelled, StrictEffect } from 'redux-saga/effects';
import { EventAction } from '../actions/event.action';
import { Events } from '../../@common/models/event.model';
import { Socket } from 'socket.io-client';
import { socketConnect, createSocketChannel, emitEvent } from '../services/event.service';
import { EventMessage, Unauthorized } from '../../@common/models';
import { AuthAction, TournamentAction } from '../actions';
import { persistor } from '../store';

//-----------------------------------------------
let socket: Socket;

// Listen socket events
function* listenEvents({
	payload: { history },
}: ReturnType<typeof EventAction.openChannel.request>): Generator<StrictEffect, void, any> {
	try {
		// Try to connect with 2sec timeout
		const { connected, timeout } = yield race({ connected: call(socketConnect), timeout: delay(20000) });
		// If timeout won the race then
		if (timeout) {
			const message: EventMessage = yield put(EventAction.closeChannel.request({}));
			console.log('[ Event ].listenEvents : ', message);
		}
		socket = connected;
		const socketChannel = yield call(createSocketChannel, connected, history);
		yield put(EventAction.openChannel.success({ connected: true }));
		while (true) {
			const message: EventMessage = yield take(socketChannel);
			switch (message.event) {
				case Events.SESSION_EXPIRED:
					yield delay(3000);
					yield put(AuthAction.logout.success(Unauthorized));
					history.push('/login');
					persistor.purge();
					break;
				case Events.TOURNAMENT_REFRESH:
					yield put(TournamentAction.reset({}));
					yield put(TournamentAction.fetch.request({}));
					break;
				case Events.TOURNAMENT_JOIN:
					yield put(TournamentAction.fetch.request({}));
					break;
				/*
				case SessionStatus.STAGE1_UPDATE:
					if (message.label) {
						toast.success(i18next.t(message.label));
					}
					yield put(Stage1Action.reloadFromServer({}));
					break;
				case SessionStatus.STAGE1_DELETE:
					showMessage(message, UserMessageType.Warning);
					// Reload tournament list
					history.push('/');
					yield put(TournamentAction.reset({}));
					yield put(TournamentAction.fetch.request({}));
					yield put(Stage1Action.reset({}));
					break;
				// Stage 2
				case SessionStatus.STAGE2_UPDATE:
					showMessage(message, UserMessageType.Success);
					yield put(Stage2Action.fetchStage2.request({ tournamentId: message.data!.tournamentId! }));
					break;
				case SessionStatus.STAGE2_DELETE:
					showMessage(message, UserMessageType.Warning);
					yield delay(5000);
					// Reload only this tournament
					yield put(Stage2Action.reset({}));
					yield put(TournamentAction.reload.request({ tId: tournament.id }));
					history.push('/stage1');
					break;
				*/
				default:
					break;
			}
		}
	} catch (error) {
		yield put(EventAction.closeChannel.request({}));
	} finally {
		if (yield cancelled()) {
			socket.disconnect();
			yield put(EventAction.closeChannel.request({}));
		}
	}
}

// Emit Events.TOURNAMENT_NEW
function* newTournament({ payload: { tournament } }: ReturnType<typeof EventAction.newTournament.request>) {
	yield emitEvent(Events.TOURNAMENT_NEW, EventAction.newTournament, tournament);
}

// Emit Events.TOURNAMENT_JOIN
function* joinTournament({ payload: { tournament } }: ReturnType<typeof EventAction.joinTournament.request>) {
	yield emitEvent(Events.TOURNAMENT_JOIN, EventAction.joinTournament, tournament);
}

// Emit Events.TOURNAMENT_LEAVE
function* leaveTournament({ payload: { tournament } }: ReturnType<typeof EventAction.leaveTournament.request>) {
	yield emitEvent(Events.TOURNAMENT_LEAVE, EventAction.leaveTournament, tournament);
}

// Close socket channel
function* closeChannel({ payload }: ReturnType<typeof EventAction.closeChannel.request>) {
	try {
		socket.close();
		yield put(EventAction.closeChannel.success({}));
	} catch (error) {
		yield put(EventAction.closeChannel.failure({}));
	}
}

export const EventSagas = [
	takeEvery(EventAction.openChannel.request, listenEvents),
	takeEvery(EventAction.closeChannel.request, closeChannel),
	takeEvery(EventAction.joinTournament.request, joinTournament),
	takeEvery(EventAction.leaveTournament.request, leaveTournament),
	takeEvery(EventAction.newTournament.request, newTournament),
];
