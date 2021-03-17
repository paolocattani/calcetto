import { call, delay, put, race, take, takeEvery } from '@redux-saga/core/effects';
import { cancelled, StrictEffect } from 'redux-saga/effects';
import { EventAction } from '../actions/event.action';
import { ClientToServerEvents, Events, ServerToClientEvents } from '../../@common/models/event.model';
import { Socket } from 'socket.io-client';
import { socketConnect, createSocketChannel, emitEvent } from '../services/event.service';
import { EventMessage, Unauthorized } from '../../@common/models';
import { AuthAction, Stage1Action, Stage2Action, TournamentAction } from '../actions';
import { persistor } from '../store';

//-----------------------------------------------
let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

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
			const message: EventMessage = yield take(socketChannel);
			console.log('[ Event ].received event from server : ', message);
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
				case Events.STAGE1_REFRESH:
					yield put(Stage1Action.reloadFromServer({}));
					break;
				// Stage 2
				case Events.STAGE2_REFRESH:
					yield put(Stage2Action.fetchStage2.request({ tournamentId: message.data!.tournament.id }));
					break;
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

// Emit Events.TOURNAMENT_DELETED
function* deleteTournament({ payload: { tournament } }: ReturnType<typeof EventAction.newTournament.request>) {
	yield emitEvent(Events.TOURNAMENT_DELETED, EventAction.deleteTournament, tournament);
}

// Emit Events.TOURNAMENT_NEW
function* newTournament({ payload: { tournament } }: ReturnType<typeof EventAction.newTournament.request>) {
	yield emitEvent(Events.TOURNAMENT_NEW, EventAction.newTournament, tournament);
}

// Emit Events.TOURNAMENT_UPDATED
function* updateTournament({ payload: { tournament } }: ReturnType<typeof EventAction.newTournament.request>) {
	yield emitEvent(Events.TOURNAMENT_UPDATED, EventAction.updateTournament, tournament);
}

// Emit Events.TOURNAMENT_JOIN
function* joinTournament({ payload: { tournament } }: ReturnType<typeof EventAction.joinTournament.request>) {
	yield emitEvent(Events.TOURNAMENT_JOIN, EventAction.joinTournament, tournament);
}

// Emit Events.TOURNAMENT_LEAVE
function* leaveTournament({ payload: { tournament } }: ReturnType<typeof EventAction.leaveTournament.request>) {
	yield emitEvent(Events.TOURNAMENT_LEAVE, EventAction.leaveTournament, tournament);
}

// Emit Events.STAGE1_REFRESH
function* updateStage1({ payload: { tournament } }: ReturnType<typeof EventAction.updateStage1.request>) {
	yield emitEvent(Events.STAGE1_UPDATED, EventAction.updateStage1, tournament);
}

// Emit Events.STAGE2_REFRESH
function* updateStage2({ payload: { tournament } }: ReturnType<typeof EventAction.updateStage2.request>) {
	yield emitEvent(Events.STAGE2_UPDATED, EventAction.updateStage2, tournament);
}

// Close socket channel
function* closeChannel({ payload }: ReturnType<typeof EventAction.closeChannel.request>) {
	try {
		socket.disconnect();
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
	takeEvery(EventAction.deleteTournament.request, deleteTournament),
	takeEvery(EventAction.updateTournament.request, updateTournament),
	takeEvery(EventAction.newTournament.request, newTournament),
	takeEvery(EventAction.updateStage1.request, updateStage1),
	takeEvery(EventAction.updateStage2.request, updateStage2),
];
