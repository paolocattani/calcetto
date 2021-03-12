import { call, delay, put, race, take, takeEvery } from '@redux-saga/core/effects';
import { cancelled, StrictEffect } from 'redux-saga/effects';
import { EventAction } from '../actions/event.action';
import { Events } from '../../@common/models/event.model';
import { Socket } from 'socket.io-client';
import { socketConnect, createSocketChannel, emitEvent } from '../services/event.service';

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
			yield put(EventAction.closeChannel.request({}));
		}
		socket = connected;
		const socketChannel = yield call(createSocketChannel, connected, history);
		yield put(EventAction.openChannel.success({ connected: true }));
		while (true) {
			yield take(socketChannel);
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
function* joinTournament({ payload: { tournamentId } }: ReturnType<typeof EventAction.joinTournament.request>) {
	yield emitEvent(Events.TOURNAMENT_JOIN, EventAction.joinTournament, tournamentId);
}

// Emit Events.TOURNAMENT_LEAVE
function* leaveTournament({ payload: { tournamentId } }: ReturnType<typeof EventAction.leaveTournament.request>) {
	yield emitEvent(Events.TOURNAMENT_LEAVE, EventAction.leaveTournament, tournamentId);
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
