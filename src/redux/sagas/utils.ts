import { GenericReponse, UnexpectedServerError } from '@common/models/common.models';
import { HTTPStatusCode } from '@common/models/HttpStatusCode';
import { toast } from 'react-toastify';
import { put, call } from 'redux-saga/effects';

// FIXME: remove this any type
export function* entityLifeCycle<Req, Res extends GenericReponse>(
  action: any,
  method: (p: Req) => Res | Promise<Res>,
  payload: Req
): ReturnType<typeof action.request> {
  try {
    const response: Res = yield call(method, payload);
    if (response.code === HTTPStatusCode.OK) {
      if (response.userMessage.message) {
        toast.success(response.userMessage.message);
      }
      yield put(action.success(response));
    } else {
      if (response.userMessage.message) {
        toast.warning(response.userMessage.message);
      }
      yield put(action.failure(response));
    }
  } catch (err) {
    yield put(action.failure(UnexpectedServerError));
  }
}
