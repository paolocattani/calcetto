import { GenericReponse, UnexpectedServerError } from '@common/models/common.models';
import { HTTPStatusCode } from '@common/models/HttpStatusCode';
import { toast } from 'react-toastify';
import { put, call } from 'redux-saga/effects';

// FIXME: remove this any types
export function* entityLifeCicle<T extends GenericReponse>(
  action: any,
  method: any,
  payload: any,
  successMessage: string,
  errorMessage: string
): ReturnType<typeof action.request> {
  try {
    const response: T = yield call(method, payload);
    if (response.code === HTTPStatusCode.OK) {
      toast.success(successMessage);
      yield put(action.success(response));
    } else {
      toast.success(errorMessage);
      yield put(action.failure(response));
    }
  } catch (err) {
    yield put(action.failure(UnexpectedServerError));
  }
}
