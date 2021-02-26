import { put, call, StrictEffect, takeEvery, take, takeLatest, delay, select } from 'redux-saga/effects';
import { AuthAction } from '../actions/auth.action';
import {
	AuthenticationError,
	AuthenticationResponse,
	CheckAuthenticationRequest,
	DeleteUserRequest,
	LoginRequest,
	LogoutRequest,
	RegistrationRequest,
	RegistrationResponse,
	Unauthorized,
	UnsubscribeRequest,
	UnsubscribeResponse,
	UpdateUserRequest,
} from '../../@common/models';
import {
	checkAuthentication,
	createSessionChannel,
	login,
	registration,
	updateUser,
	deleteUser,
	logout,
	unsubscribe,
} from '../services/auth.service';
import { toast } from 'react-toastify';
import { Action } from 'typesafe-actions';
import { persistor } from '../store';
import { Stage1Action, Stage2Action, TournamentAction } from '../actions';
import { Message, SessionStatus, UserMessageType } from '../../@common/models/common.models';
import { entityLifeCycle, getToast } from './utils';
import i18next from '../../i18n/i18n';
import { formatDate } from '../../@common/utils/date.utils';
import { TournamentSelector } from '../selectors';
import logger from '../../@common/utils/logger.utils';

function* checkAuthenticationSaga({
	payload: { history },
}: ReturnType<typeof AuthAction.checkAuthentication.request>): Generator<StrictEffect, void, any> {
	const onSuccess = function* () {
		yield put(AuthAction.sessionControl.request({ history }));
		//yield put(TournamentAction.fetch.request({}));
	};

	// yield call(setCSRFToken);
	yield* entityLifeCycle<CheckAuthenticationRequest, AuthenticationResponse, AuthenticationError>(
		AuthAction.checkAuthentication,
		checkAuthentication,
		{},
		onSuccess,
		undefined,
		false
	);
}

/*
	FIXME:
	https://github.com/redux-saga/redux-saga/issues/868
	https://github.com/redux-saga/redux-saga/blob/master/docs/advanced/Channels.md#using-the-eventchannel-factory-to-connect-to-external-events
	https://github.com/redux-saga/redux-saga/issues/940#issuecomment-298170212
*/
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

function* watchSessionSaga({
	payload: { history },
}: ReturnType<typeof AuthAction.sessionControl.request>): Generator<StrictEffect, void, any> {
	try {
		const eventChannel = new EventSource('/sse/v1/session');
		const channel = yield call(createSessionChannel, eventChannel);
		while (true) {
			const message: Message = yield take(channel);
			const tournament = yield select(TournamentSelector.getTournament);
			// https://fkhadra.github.io/react-toastify/render-what-you-want/
			switch (message.status) {
				// Session
				case SessionStatus.SESSION_EXPIRED:
					showMessage(message, UserMessageType.Danger);
					yield delay(3000);
					yield put(AuthAction.logout.success(Unauthorized));
					history.push('/login');
					persistor.purge();
					break;
				// Tournament
				case SessionStatus.TOURNAMENT_NEW:
					showMessage(message, UserMessageType.Success);
					yield put(TournamentAction.fetch.request({}));
					break;
				case SessionStatus.TOURNAMENT_UPDATE:
					showMessage(message, UserMessageType.Success);
					yield put(TournamentAction.reload.request({ tId: tournament.id }));
					break;
				/*
					case SessionStatus.TOURNAMENT_DELETE:
						toast.warn(i18next.t(message.label!));
						yield put(TournamentAction.fetch.request({}));
						history.push('/');
						break;
				*/
				// Stage 1
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
			}
		}
	} catch (err) {
		console.log('watchSessionSaga.err : ', err);
	}
}

// Logout
function* logoutSaga({
	payload: { history },
}: ReturnType<typeof AuthAction.logout.request>): Generator<StrictEffect, void, any> {
	const onSuccess = async () => {
		await persistor.purge();
		history.push('/');
	};
	yield* entityLifeCycle<LogoutRequest, AuthenticationResponse, AuthenticationError>(
		AuthAction.logout,
		logout,
		{},
		onSuccess
	);
}

// Login
function* loginSaga({
	payload: { history, ...loginRequest },
}: ReturnType<typeof AuthAction.login.request>): Generator<StrictEffect, void, any> {
	const onSuccess = function* () {
		yield put(AuthAction.sessionControl.request({ history }));
		// yield put(TournamentAction.fetch.request({}));
	};
	yield* entityLifeCycle<LoginRequest, AuthenticationResponse, AuthenticationError>(
		AuthAction.login,
		login,
		loginRequest,
		onSuccess
	);
}

// Registration
function* registrationSaga({
	payload: { history, ...registrationRequest },
}: ReturnType<typeof AuthAction.registration.request>): Generator<StrictEffect, void, any> {
	const onSuccess = function* () {
		yield put(AuthAction.sessionControl.request({ history }));
		// yield put(TournamentAction.fetch.request({}));
	};
	yield* entityLifeCycle<RegistrationRequest, RegistrationResponse, AuthenticationError>(
		AuthAction.registration,
		registration,
		registrationRequest,
		onSuccess
	);
}

function* unsubscribeSaga(payload: ReturnType<typeof AuthAction.unsubscribe.request>) {
	yield* entityLifeCycle<UnsubscribeRequest, UnsubscribeResponse, AuthenticationError>(
		AuthAction.unsubscribe,
		unsubscribe,
		{}
	);
}

// Update user
function* updateUserSaga({
	payload: { history, ...updateUserRequest },
}: ReturnType<typeof AuthAction.update.request>): Generator<StrictEffect, void, any> {
	yield* entityLifeCycle<UpdateUserRequest, AuthenticationResponse, AuthenticationError>(
		AuthAction.update,
		updateUser,
		updateUserRequest,
		() => history.push('/')
	);
}

// Delete user
function* deleteUserSaga({
	payload: { history, ...deleteUserRequest },
}: ReturnType<typeof AuthAction.delete.request>): Generator<StrictEffect, void, any> {
	const onSuccess = function* () {
		yield put(AuthAction.logout.request({ history }));
	};
	yield* entityLifeCycle<DeleteUserRequest, RegistrationResponse, AuthenticationError>(
		AuthAction.delete,
		deleteUser,
		deleteUserRequest,
		onSuccess
	);
}

function logAction(action: Action<any>) {
	if (process.env.NODE_ENV === 'development') {
		logger.debug('Action : ', action);
	}
}

export const SessionSagas = [
	takeEvery(AuthAction.unsubscribe.request, unsubscribeSaga),
	takeEvery(AuthAction.logout.request, logoutSaga),
	takeEvery(AuthAction.login.request, loginSaga),
	takeEvery(AuthAction.update.request, updateUserSaga),
	takeEvery(AuthAction.delete.request, deleteUserSaga),
	takeEvery(AuthAction.registration.request, registrationSaga),
	takeEvery(AuthAction.checkAuthentication.request, checkAuthenticationSaga),
	takeLatest(AuthAction.sessionControl.request, watchSessionSaga),
	takeEvery('*', logAction),
];
