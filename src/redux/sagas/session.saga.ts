import { put, call, StrictEffect, takeEvery, take, takeLatest } from 'redux-saga/effects';
import { SessionAction } from 'redux/actions/session.action';
import { AuthenticationResponse } from 'redux/models';
import { CheckAuthentication, createSessionChannel, Message } from 'redux/services/session.service';
import { toast } from 'react-toastify';
import { Action } from 'typesafe-actions';

function* checkAuthenticationSaga({
  payload,
}: ReturnType<typeof SessionAction.checkAuthentication.request>): Generator<StrictEffect, void, any> {
  try {
    const response: AuthenticationResponse = yield call(CheckAuthentication, payload);
    yield put(SessionAction.checkAuthentication.success(response));
    yield put(SessionAction.sessionControl.request({ history: payload.history }));
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

function* watchSessionSaga(
  action: ReturnType<typeof SessionAction.sessionControl.request>
): Generator<StrictEffect, void, any> {
  try {
    console.log('watchSessionSaga : start');
    const eventChannel = new EventSource('/sse/v1/session');
    const channel = yield call(createSessionChannel, eventChannel);
    while (true) {
      const message: Message = yield take(channel);
      if (message) {
        console.log('Message from queue : ', message);
        toast.error('La tua sessione è scaduta');
        yield put(SessionAction.updateSession({ user: undefined }));
        action.payload.history.push('/login');
      }
    }
  } catch (err) {
    console.log('watchSessionSaga.err : ', err);
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
  console.log('Action : ', action);
}

export const SessionSagas = [
  takeEvery(SessionAction.checkAuthentication.request, checkAuthenticationSaga),
  takeLatest(SessionAction.sessionControl.request, watchSessionSaga),
  takeEvery('*', logger),
];
