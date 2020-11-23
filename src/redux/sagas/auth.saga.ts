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
        toast.error('La tua sessione è scaduta. Stai per essere reindirizzato alla login...');
        yield delay(3000);
        yield put(
          AuthAction.logout.success({
            user: undefined,
            code: HTTPStatusCode.Unauthorized,
            message: 'Unauthorized!',
            userMessage: { message: 'Sessione scaduta...', type: UserMessageType.Danger },
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
  if (logoutReponse.code === HTTPStatusCode.Success) {
    yield put(AuthAction.logout.success(logoutReponse));
    history.push('/');
    toast.success(logoutReponse.userMessage.message);
  } else {
    toast.error(logoutReponse.userMessage.message);
    yield put(AuthAction.logout.failure(logoutReponse));
  }
  persistor.purge();
  yield put(
    AuthAction.logout.success({
      code: HTTPStatusCode.Success,
      message: 'Logout complete',
      userMessage: {
        type: UserMessageType.Success,
        message: 'Logout ',
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
  if (loginReponse.code === HTTPStatusCode.Success) {
    yield put(AuthAction.login.success(loginReponse));
    // Session control
    yield put(AuthAction.sessionControl.request({ history }));
    // Fetch tournament
    yield put(TournamentAction.fetch.request({}));
    // history.push('/');
    toast.success(loginReponse.userMessage.message);
  } else {
    toast.error(loginReponse.userMessage.message);
    yield put(AuthAction.login.failure(loginReponse));
  }
}

// Registration
function* registrationSaga({
  payload: { history, ...registrationRequest },
}: ReturnType<typeof AuthAction.registration.request>): Generator<StrictEffect, void, any> {
  // Validate Registration
  const registrationReponse: RegistrationResponse = yield call(registration, registrationRequest);
  if (registrationReponse.code === HTTPStatusCode.Success) {
    yield put(AuthAction.registration.success(registrationReponse));
    // Session control
    yield put(AuthAction.sessionControl.request({ history }));
    // Fetch tournament
    yield put(TournamentAction.fetch.request({}));
    history.push('/');
    toast.success(registrationReponse.userMessage.message);
  } else {
    if (registrationReponse.errors) {
      registrationReponse.errors.forEach((e) => toast.error(e));
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
  if (updateReponse.code === HTTPStatusCode.Success) {
    yield put(AuthAction.update.success(updateReponse));
    history.push('/');
    toast.success(updateReponse.userMessage.message);
  } else {
    toast.error(updateReponse.userMessage.message);
    yield put(AuthAction.update.failure(updateReponse));
  }
}

// Delete user
function* deleteUserSaga({
  payload: { history, ...deleteUserRequest },
}: ReturnType<typeof AuthAction.delete.request>): Generator<StrictEffect, void, any> {
  // Validate Login
  const deleteReponse: AuthenticationResponse = yield call(deleteUser, deleteUserRequest);
  if (deleteReponse.code === HTTPStatusCode.Success) {
    yield put(AuthAction.delete.success(deleteReponse));
    yield put(AuthAction.logout.request({ history }));
    toast.success(deleteReponse.userMessage.message);
  } else {
    toast.error(deleteReponse.userMessage.message);
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
