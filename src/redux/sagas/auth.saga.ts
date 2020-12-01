import { put, call, StrictEffect, takeEvery, take, takeLatest, delay } from 'redux-saga/effects';
import { AuthAction } from '../actions/auth.action';
import { AuthenticationResponse, RegistrationResponse } from '../../@common/models';
import {
	CheckAuthentication,
	createSessionChannel,
	Message,
	login,
	registration,
	updateUser,
	deleteUser,
	logout,
	SessionStatus,
} from '../services/auth.service';
import { toast } from 'react-toastify';
import { Action } from 'typesafe-actions';
import { persistor } from '../store';
import { HTTPStatusCode } from '../../@common/models/HttpStatusCode';
import { TournamentAction } from '../actions';
import { UserMessageType } from '../../@common/models/common.models';
import { getMessage } from './utils';
import i18next from 'i18next';

function* checkAuthenticationSaga({
	payload: { history },
}: ReturnType<typeof AuthAction.checkAuthentication.request>): Generator<StrictEffect, void, any> {
	try {
		const response: AuthenticationResponse = yield call(CheckAuthentication);
		if (response.code === HTTPStatusCode.Success) {
			yield put(AuthAction.checkAuthentication.success(response));
			yield put(AuthAction.sessionControl.request({ history }));
		} else {
			yield put(AuthAction.checkAuthentication.failure(response));
		}
	} catch (err) {
		yield put(AuthAction.checkAuthentication.failure(err));
	}
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
			if (message && message.status === SessionStatus.SESSION_EXPIRED) {
				toast.error(i18next.t('auth:expired_alert'));
				yield delay(3000);
				yield put(
					AuthAction.logout.success({
						user: undefined,
						code: HTTPStatusCode.Unauthorized,
						message: 'Unauthorized!',
						userMessage: {
							type: UserMessageType.Danger,
							label: 'auth:expired',
						},
					})
				);
				history.push('/login');
				persistor.purge();
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
	const logoutReponse: AuthenticationResponse = yield call(logout);
	const message = getMessage(logoutReponse.userMessage);
	if (logoutReponse.code === HTTPStatusCode.Success) {
		yield put(AuthAction.logout.success(logoutReponse));
		history.push('/');
		toast.success(message);
	} else {
		toast.error(message);
		yield put(AuthAction.logout.failure(logoutReponse));
	}
	persistor.purge();
	yield put(
		AuthAction.logout.success({
			code: HTTPStatusCode.Success,
			message: 'Logout complete',
			userMessage: {
				type: UserMessageType.Success,
				label: 'auth:logout',
			},
		})
	);
}

// Login
function* loginSaga({
	payload: { history, ...loginRequest },
}: ReturnType<typeof AuthAction.login.request>): Generator<StrictEffect, void, any> {
	// Validate Login
	const loginReponse: AuthenticationResponse = yield call(login, loginRequest);
	const message = getMessage(loginReponse.userMessage);
	if (loginReponse.code === HTTPStatusCode.Success) {
		yield put(AuthAction.login.success(loginReponse));
		// Session control
		yield put(AuthAction.sessionControl.request({ history }));
		// Fetch tournament
		yield put(TournamentAction.fetch.request({}));
		// history.push('/');
		toast.success(message);
	} else {
		toast.error(message);
		yield put(AuthAction.login.failure(loginReponse));
	}
}

// Registration
function* registrationSaga({
	payload: { history, ...registrationRequest },
}: ReturnType<typeof AuthAction.registration.request>): Generator<StrictEffect, void, any> {
	// Validate Registration
	const registrationReponse: RegistrationResponse = yield call(registration, registrationRequest);
	const message = getMessage(registrationReponse.userMessage);
	if (registrationReponse.code === HTTPStatusCode.Success) {
		yield put(AuthAction.registration.success(registrationReponse));
		// Session control
		yield put(AuthAction.sessionControl.request({ history }));
		// Fetch tournament
		yield put(TournamentAction.fetch.request({}));
		history.push('/');
		toast.success(message);
	} else {
		if (registrationReponse.errors) {
			registrationReponse.errors.forEach((e) => toast.error(i18next.t(e.message, e.options)));
		}
		yield put(AuthAction.registration.failure(registrationReponse));
	}
}

// Update user
function* updateUserSaga({
	payload: { history, ...updateUserRequest },
}: ReturnType<typeof AuthAction.update.request>): Generator<StrictEffect, void, any> {
	// Validate Login
	const updateReponse: AuthenticationResponse = yield call(updateUser, updateUserRequest);
	const message = getMessage(updateReponse.userMessage);
	if (updateReponse.code === HTTPStatusCode.Success) {
		yield put(AuthAction.update.success(updateReponse));
		history.push('/');
		toast.success(message);
	} else {
		toast.error(message);
		yield put(AuthAction.update.failure(updateReponse));
	}
}

// Delete user
function* deleteUserSaga({
	payload: { history, ...deleteUserRequest },
}: ReturnType<typeof AuthAction.delete.request>): Generator<StrictEffect, void, any> {
	// Validate Login
	const deleteReponse: AuthenticationResponse = yield call(deleteUser, deleteUserRequest);
	const message = getMessage(deleteReponse.userMessage);
	if (deleteReponse.code === HTTPStatusCode.Success) {
		yield put(AuthAction.delete.success(deleteReponse));
		yield put(AuthAction.logout.request({ history }));
		toast.success(message);
	} else {
		toast.error(message);
		yield put(AuthAction.delete.failure(deleteReponse));
	}
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
