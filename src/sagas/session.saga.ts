import { put, call, StrictEffect, takeEvery } from 'redux-saga/effects';
import { SessionAction } from 'actions/session.action';
import { CheckAuthenticationRequest } from 'models';
import { CheckAuthentication } from 'services/session.service';

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

export const SessionSagas = [takeEvery(SessionAction.checkAuthentication.request, checkAuthenticationSaga)];
