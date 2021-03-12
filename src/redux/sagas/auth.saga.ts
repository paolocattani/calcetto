import { put, StrictEffect, takeEvery } from 'redux-saga/effects';
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
	UpdateUserRequest,
} from '../../@common/models';
import { checkAuthentication, login, registration, updateUser, deleteUser, logout } from '../services/auth.service';
import { Action } from 'typesafe-actions';
import { persistor } from '../store';
import { entityLifeCycle } from './utils';
import { EventAction } from '../actions/event.action';

function* checkAuthenticationSaga({
	payload: { history },
}: ReturnType<typeof AuthAction.checkAuthentication.request>): Generator<StrictEffect, void, any> {
	const onSuccess = function* () {
		yield put(EventAction.openChannel.request({ history }));
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
		yield put(EventAction.openChannel.request({ history }));
	};
	persistor.purge();
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
		yield put(EventAction.openChannel.request({ history }));
	};
	persistor.purge();
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
	takeEvery('*', logger),
];
