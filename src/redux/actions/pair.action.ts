import { createAsyncAction, createAction } from 'typesafe-actions';
import { defaultAsyncParams, defaultParam, PurgeResponse, PURGE_STORE_ACTION } from './constants';
import { FetchPairsRequest, FetchPairsResponse, PairError } from '../../@common/models';

const actionName = '[Pair]';

export const PairAction = {
	// Fetch Pairs
	fetch: createAsyncAction(...defaultAsyncParams(actionName, 'Fetch Pairs'))<
		FetchPairsRequest,
		FetchPairsResponse,
		PairError
	>(),
	reset: createAction(...defaultParam(actionName, 'Pair Reset'))<Record<string, never>>(),
	purge: createAction(PURGE_STORE_ACTION)<PurgeResponse>(),
};
