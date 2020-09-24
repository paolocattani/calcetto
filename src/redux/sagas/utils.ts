import { GenericReponse, UnexpectedServerError } from '@common/models/common.models';
import { HTTPStatusCode } from '@common/models/HttpStatusCode';
import { toast } from 'react-toastify';
import { put, call } from 'redux-saga/effects';

// FIXME: remove this any type
export function* entityLifeCycle<Req, Res extends GenericReponse>(
  action: any,
  method: (p: Req) => Res | Promise<Res>,
  payload: Req,
  onSuccess?: (response: Res) => void,
  onFailure?: (response: Res) => void
): ReturnType<typeof action.request> {
  try {
    // Call method with payload
    const response: Res = yield call(method, payload);
    // If success
    // FIXME: include all 2XX
    if (response.code === HTTPStatusCode.OK) {
      // Show success toast
      if (response.userMessage.message) {
        toast.success(response.userMessage.message);
      }
      // Dispatch success action
      yield put(action.success(response));
      // Callback
      if (onSuccess) {
        onSuccess(response);
      }
    } else {
      // Show warning toast
      if (response.userMessage.message) {
        toast.warning(response.userMessage.message);
      }
      // Dispatch failure action
      yield put(action.failure(response));
      // Callback
      if (onFailure) {
        onFailure(response);
      }
    }
  } catch (err) {
    yield put(action.failure(UnexpectedServerError));
  }
}
