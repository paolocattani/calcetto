import { GenericReponse, UnexpectedServerError, UserMessageType } from '@common/models/common.models';
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
    if (response.userMessage) {
      switch (response.userMessage.message) {
        case UserMessageType.Success:
          toast.success(response.userMessage.message);
          break;
        case UserMessageType.Warning:
          toast.warning(response.userMessage.message);
          break;
        case UserMessageType.Danger:
          toast.error(response.userMessage.message);
          break;
      }
    }

    // If success
    // FIXME: include all 2XX
    if (response.code === HTTPStatusCode.Success) {
      // Show success toast
      // Dispatch success action
      yield put(action.success(response));
      // Callback
      if (onSuccess) {
        onSuccess(response);
      }
    } else {
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
