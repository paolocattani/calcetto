import { put, call, StrictEffect, takeEvery, take, takeLatest } from 'redux-saga/effects';
import { SessionAction } from 'actions/session.action';
import { CheckAuthenticationRequest } from 'models';
import { CheckAuthentication, createCommunicationChannel, Message } from 'services/session.service';

function* checkAuthenticationSaga(
  action: ReturnType<typeof SessionAction.checkAuthentication.request>
): Generator<StrictEffect, void, any> {
  try {
    const response: CheckAuthenticationRequest = yield call(CheckAuthentication, action.payload);
    yield put(SessionAction.checkAuthentication.success(response));
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
    const channel = yield call(createCommunicationChannel, eventChannel);
    while (true) {
      const message: Message = yield take(channel);
      if (message) {
        console.log('Message from queue : ', message);
        yield put(SessionAction.updateSession({ message: { type: 'danger', message: 'La tua sessione è scaduta' } }));
        action.payload.history.push('/login');
      }
    }
  } catch (err) {
    console.log('watchSessionSaga.err : ', err);
  }
}

export const SessionSagas = [
  takeEvery(SessionAction.checkAuthentication.request, checkAuthenticationSaga),
  takeLatest(SessionAction.sessionControl.request, watchSessionSaga),
];
