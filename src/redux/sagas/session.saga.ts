import { put, call, StrictEffect, takeEvery, take, takeLatest, delay } from 'redux-saga/effects';
import { SessionAction } from 'redux/actions/session.action';
import { AuthenticationResponse, RegistrationResponse } from '@common/models';
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
} from 'redux/services/session.service';
import { toast } from 'react-toastify';
import { Action } from 'typesafe-actions';
import { persistor } from 'redux/store';
import { HTTPStatusCode } from '@common/models/HttpStatusCode';
import { TournamentAction } from 'redux/actions';
import { UserMessageType } from '@common/models/common.models';

function* checkAuthenticationSaga({
  payload,
}: ReturnType<typeof SessionAction.checkAuthentication.request>): Generator<StrictEffect, void, any> {
  try {
    const response: AuthenticationResponse = yield call(CheckAuthentication);
    if (response.code === HTTPStatusCode.OK) {
      yield put(SessionAction.checkAuthentication.success(response));
      yield put(SessionAction.sessionControl.request({ history: payload.history }));
    } else {
      yield put(
        SessionAction.checkAuthentication.failure({
          code: response.code,
          message: response.message,
          userMessage: response.userMessage,
        })
      );
    }
  } catch (err) {
    yield put(SessionAction.checkAuthentication.failure(err));
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
}: ReturnType<typeof SessionAction.sessionControl.request>): Generator<StrictEffect, void, any> {
  try {
    const eventChannel = new EventSource('/sse/v1/session');
    const channel = yield call(createSessionChannel, eventChannel);
    while (true) {
      const message: Message = yield take(channel);
      if (message && message.status === SessionStatus.SESSION_EXPIRED) {
        toast.error('La tua sessione è scaduta. Stai per essere reindirizzato alla login...');
        yield delay(3000);
        yield put(
          SessionAction.logout.success({
            user: undefined,
            code: HTTPStatusCode.Unauthorized,
            message: 'Unauthorized!',
            userMessage: { message: 'Sessione scaduta...', type: UserMessageType.Danger },
          })
        );
        history.push('/login');
      }
    }
  } catch (err) {
    console.log('watchSessionSaga.err : ', err);
  }
}

// Logout
function* logoutSaga(action: ReturnType<typeof SessionAction.logout.request>): Generator<StrictEffect, void, any> {
  const logoutReponse: AuthenticationResponse = yield call(logout);
  if (logoutReponse.code === HTTPStatusCode.OK) {
    yield put(SessionAction.logout.success(logoutReponse));
    action.payload.history.push('/');
    toast.success(logoutReponse.userMessage.message);
  } else {
    toast.error(logoutReponse.userMessage.message);
    yield put(SessionAction.logout.failure(logoutReponse));
  }
  persistor.purge();
  yield put(
    SessionAction.logout.success({
      code: HTTPStatusCode.OK,
      message: 'Logout complete',
      userMessage: {
        type: UserMessageType.Success,
        message: 'Logout ',
      },
    })
  );
}

// Login
function* loginSaga({ payload }: ReturnType<typeof SessionAction.login.request>): Generator<StrictEffect, void, any> {
  // Validate Login
  const loginReponse: AuthenticationResponse = yield call(login, payload);
  if (loginReponse.code === HTTPStatusCode.OK) {
    yield put(SessionAction.login.success(loginReponse));
    // Session control
    yield put(SessionAction.sessionControl.request({ history: payload.history }));
    // Fetch tournament
    yield put(TournamentAction.fetch.request({}));
    payload.history.push('/');
    toast.success(loginReponse.userMessage.message);
  } else {
    toast.error(loginReponse.userMessage.message);
    yield put(SessionAction.login.failure(loginReponse));
  }
}

// Registration
function* registrationSaga({
  payload,
}: ReturnType<typeof SessionAction.registration.request>): Generator<StrictEffect, void, any> {
  // Validate Registration
  const registrationReponse: RegistrationResponse = yield call(registration, payload);
  if (registrationReponse.code === HTTPStatusCode.OK) {
    yield put(SessionAction.registration.success(registrationReponse));
    // Session control
    yield put(SessionAction.sessionControl.request({ history: payload.history }));
    // Fetch tournament
    yield put(TournamentAction.fetch.request({}));
    payload.history.push('/');
    toast.success(registrationReponse.userMessage.message);
  } else {
    if (registrationReponse.errors) {
      registrationReponse.errors.forEach((e) => toast.error(e));
    }
    yield put(SessionAction.registration.failure(registrationReponse));
  }
}

// Update user
function* updateUserSaga(action: ReturnType<typeof SessionAction.update.request>): Generator<StrictEffect, void, any> {
  // Validate Login
  const updateReponse: AuthenticationResponse = yield call(updateUser, action.payload);
  if (updateReponse.code === HTTPStatusCode.OK) {
    yield put(SessionAction.update.success(updateReponse));
    action.payload.history.push('/');
    toast.success(updateReponse.userMessage.message);
  } else {
    toast.error(updateReponse.userMessage.message);
    yield put(SessionAction.update.failure(updateReponse));
  }
}

// Delete user
function* deleteUserSaga(action: ReturnType<typeof SessionAction.delete.request>): Generator<StrictEffect, void, any> {
  // Validate Login
  const deleteReponse: AuthenticationResponse = yield call(deleteUser, action.payload);
  if (deleteReponse.code === HTTPStatusCode.OK) {
    yield put(SessionAction.delete.success(deleteReponse));
    yield put(SessionAction.logout.request({ history: action.payload.history }));
    toast.success(deleteReponse.userMessage.message);
  } else {
    toast.error(deleteReponse.userMessage.message);
    yield put(SessionAction.delete.failure(deleteReponse));
  }
}

function logger(action: Action<any>) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Action : ', action);
  }
}

export const SessionSagas = [
  takeEvery(SessionAction.logout.request, logoutSaga),
  takeEvery(SessionAction.login.request, loginSaga),
  takeEvery(SessionAction.update.request, updateUserSaga),
  takeEvery(SessionAction.delete.request, deleteUserSaga),
  takeEvery(SessionAction.registration.request, registrationSaga),
  takeEvery(SessionAction.checkAuthentication.request, checkAuthenticationSaga),
  takeLatest(SessionAction.sessionControl.request, watchSessionSaga),
  takeEvery('*', logger),
];
