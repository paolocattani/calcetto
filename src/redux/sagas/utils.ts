import {
	GenericReponse, OmitHistory,
	UnexpectedServerError,
	UserMessage,
	UserMessageType,
} from '../../@common/models/common.models';
import {HTTPStatusCode, SuccessCodes} from '../../@common/models/HttpStatusCode';
import { put, call, StrictEffect } from 'redux-saga/effects';
import { PayloadActionCreator } from 'typesafe-actions';
import { toast } from 'react-toastify';
import i18n from '../../i18n/i18n';

interface IActionCallback<T> {
	( response?:T ) : void | Promise<void> | Generator<StrictEffect,void, void>;
}

interface ActionType<TReq, TRes extends GenericReponse,TErr> {
	request: PayloadActionCreator<string, TReq>,
	success: PayloadActionCreator<string, TRes>,
	failure: PayloadActionCreator<string, TErr | typeof UnexpectedServerError>
}

export const getMessage = (message: UserMessage) => i18n.t(message.label, message.options);
export function* entityLifeCycle<TReq, TRes extends GenericReponse,TErr extends GenericReponse>(
	action: ActionType<TReq, TRes, TErr>,
	method: (p: OmitHistory<TReq>) => TRes | Promise<TRes | typeof UnexpectedServerError>,
	payload: OmitHistory<TReq>,
	onSuccess?: IActionCallback<TRes>,
	onFailure?: IActionCallback<TErr>,
	showMessage:boolean = true,
): Generator<StrictEffect, void, any> {
	try {
		// Call method with payload
		const response: TRes | TErr = yield call(method, payload);
		const { userMessage: message } = response;

		if (showMessage && message) {
			const messageText = getMessage(message);
			switch (message.type) {
				case UserMessageType.Success:
					toast.success(messageText);
					break;
				case UserMessageType.Warning:
					toast.warning(messageText);
					break;
				case UserMessageType.Danger:
					toast.error(messageText);
					break;
			}
		}

		// If success
		// FIXME: include all 2XX
		if (SuccessCodes.includes(response.code)) {
			const successRes = response as TRes;
			// Show success toast
			// Dispatch success action
			yield put(action.success(successRes));
			// Callback
			if (onSuccess) {
				yield* onSuccess(successRes);
			}
		} else {
			const failureRes = response as TErr;
			// Dispatch failure action
			yield put(action.failure(failureRes));
			// Callback
			if (onFailure) {
				yield* onFailure(failureRes);
			}
		}
	} catch (err) {
		yield put(action.failure(UnexpectedServerError));
	}
}
