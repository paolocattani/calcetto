import { put, call, StrictEffect, takeEvery, take, takeLatest, delay } from 'redux-saga/effects';
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
} from '../services/auth.service';
import { toast } from 'react-toastify';
import { Action } from 'typesafe-actions';
import { persistor } from '../store';
import { Stage1Action, TournamentAction } from '../actions';
import { Message, SessionStatus } from '../../@common/models/common.models';
import { entityLifeCycle } from './utils';
import i18next from 'src/i18n/i18n';

function* checkAuthenticationSaga({
	payload: { history },
}: ReturnType<typeof AuthAction.checkAuthentication.request>): Generator<StrictEffect, void, any> {
	const onSuccess = function* () {
		yield put(AuthAction.sessionControl.request({ history }));
	};
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

function* watchSessionSaga({
	payload: { history },
}: ReturnType<typeof AuthAction.sessionControl.request>): Generator<StrictEffect, void, any> {
	try {
		const eventChannel = new EventSource('/sse/v1/session');
		const channel = yield call(createSessionChannel, eventChannel);
		while (true) {
			const message: Message = yield take(channel);
			if (message.status === SessionStatus.SESSION_EXPIRED) {
				toast.error(i18next.t('auth:expired_alert'));
				yield delay(3000);
				yield put(AuthAction.logout.success(Unauthorized));
				history.push('/login');
				persistor.purge();
				return;
			}
			if (message.status === SessionStatus.STAGE1_UPDATE) {
				yield put(Stage1Action.reloadFromServer({}));
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
	const onSuccess = () => {
		history.push('/');
		persistor.purge();
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
		yield put(TournamentAction.fetch.request({}));
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
		yield put(TournamentAction.fetch.request({}));
	};
	yield* entityLifeCycle<RegistrationRequest, RegistrationResponse, AuthenticationError>(
		AuthAction.registration,
		registration,
		registrationRequest,
		onSuccess
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

function logger(action: Action<any>) {
	if (process.env.NODE_ENV === 'development') {
		console.log('Action : ', action);
	}
}

export const SessionSagas = [
	takeEvery(AuthAction.logout.request, logoutSaga),
	takeEvery(AuthAction.login.request, loginSaga),
	takeEvery(AuthAction.update.request, updateUserSaga),
	takeEvery(AuthAction.delete.request, deleteUserSaga),
	takeEvery(AuthAction.registration.request, registrationSaga),
	takeEvery(AuthAction.checkAuthentication.request, checkAuthenticationSaga),
	takeLatest(AuthAction.sessionControl.request, watchSessionSaga),
	takeEvery('*', logger),
];
