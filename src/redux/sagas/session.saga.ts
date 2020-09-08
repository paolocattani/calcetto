import { put, call, StrictEffect, takeEvery, take, takeLatest, fork } from 'redux-saga/effects';
import { SessionAction } from 'redux/actions/session.action';
import { AuthenticationResponse, UserMessageType, RegistrationResponse } from 'redux/models';
import {
  CheckAuthentication,
  createSessionChannel,
  Message,
  login,
  registration,
} from 'redux/services/session.service';
import { toast } from 'react-toastify';
import { Action } from 'typesafe-actions';
import { persistor } from 'redux/store';
import { HTTPStatusCode } from 'redux/models/HttpStatusCode';
import { TournamentAction } from 'redux/actions';

function* checkAuthenticationSaga({
  payload,
}: ReturnType<typeof SessionAction.checkAuthentication.request>): Generator<StrictEffect, void, any> {
  try {
    console.log('checkAuthenticationSaga : ');
    const response: AuthenticationResponse = yield call(CheckAuthentication, payload);
    yield put(SessionAction.checkAuthentication.success(response));
    yield fork(SessionAction.sessionControl.request, { history: payload.history });
  } catch (err) {
    console.log('checkAuthenticationSaga : error => ', err);
    yield put(SessionAction.checkAuthentication.failure(err));
  }
}

/*
FIXME:
https://github.com/redux-saga/redux-saga/issues/868
https://github.com/redux-saga/redux-saga/blob/master/docs/advanced/Channels.md#using-the-eventchannel-factory-to-connect-to-external-events
https://github.com/redux-saga/redux-saga/issues/940#issuecomment-298170212
*/

function* watchSessionSaga(
  action: ReturnType<typeof SessionAction.sessionControl.request>
): Generator<StrictEffect, void, any> {
  try {
    const eventChannel = new EventSource('/sse/v1/session');
    const channel = yield call(createSessionChannel, eventChannel);
    while (true) {
      const message: Message = yield take(channel);
      if (message) {
        console.log('Message from queue : ', message);
        toast.error('La tua sessione è scaduta');
        // FIXME:
        yield put(
          SessionAction.updateSession({
            user: undefined,
            code: HTTPStatusCode.Unauthorized,
            message: 'Unauthorized!',
            userMessage: { message: 'Sessione scaduta', type: UserMessageType.Danger },
          })
        );
        action.payload.history.push('/login');
      }
    }
  } catch (err) {
    console.log('watchSessionSaga.err : ', err);
  }
}

// Logout
function* logoutSaga(action: ReturnType<typeof SessionAction.logout.request>): Generator<StrictEffect, void, any> {
  persistor.purge();
  yield put(
    SessionAction.logout.success({
      code: HTTPStatusCode.Accepted,
      message: 'Logout complete',
      userMessage: {
        type: UserMessageType.Success,
        message: 'Logout ',
      },
    })
  );
}

// Login
function* loginSaga(action: ReturnType<typeof SessionAction.login.request>): Generator<StrictEffect, void, any> {
  // Validate Login
  const loginReponse: AuthenticationResponse = yield call(login, action.payload);
  if (loginReponse.code === HTTPStatusCode.Accepted) {
    yield put(SessionAction.login.success(loginReponse));
    yield fork(TournamentAction.fetchTournaments.request, {});
    action.payload.history.push('/');
    toast.success(loginReponse.userMessage.message);
  } else {
    toast.error(loginReponse.userMessage.message);
    yield put(SessionAction.login.failure(loginReponse));
  }
}

// Registration
function* regitrationSaga(
  action: ReturnType<typeof SessionAction.registration.request>
): Generator<StrictEffect, void, any> {
  // Validate Login
  const registrationReponse: RegistrationResponse = yield call(registration, action.payload);
  console.log('regitrationSaga : ', registrationReponse);
  if (registrationReponse.code === HTTPStatusCode.Accepted) {
    yield put(SessionAction.registration.success(registrationReponse));
    yield fork(TournamentAction.fetchTournaments.request, {});
    action.payload.history.push('/');
    toast.success(registrationReponse.userMessage.message);
  } else {
    if (registrationReponse.errors) {
      registrationReponse.errors.forEach((e) => toast.error(e));
    }
    yield put(SessionAction.registration.failure(registrationReponse));
  }
}

/*
function* logger(action: Action<any>) {
  const state = yield select();
  console.log('action', action);
  console.log('state after', state);
}
*/

function logger(action: Action<any>) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Action : ', action);
  }
}

export const SessionSagas = [
  takeEvery(SessionAction.logout.request, logoutSaga),
  takeEvery(SessionAction.login.request, loginSaga),
  takeEvery(SessionAction.registration.request, regitrationSaga),
  takeEvery(SessionAction.checkAuthentication.request, checkAuthenticationSaga),
  takeLatest(SessionAction.sessionControl.request, watchSessionSaga),
  takeEvery('*', logger),
];
