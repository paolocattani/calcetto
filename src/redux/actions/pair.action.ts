import { createAsyncAction, createAction } from 'typesafe-actions';
import { defaultAsyncParams, PurgeResponse, PURGE_STORE_ACTION } from './constants';
import { FetchPairsRequest, FetchPairsResponse } from 'redux/models';

const actionName = '[Pair]';

export const PairAction = {
  // Fetch Pairs
  fetch: createAsyncAction(...defaultAsyncParams(actionName, 'Fetch Pairs'))<
    FetchPairsRequest,
    FetchPairsResponse,
    Error
  >(),
  purge: createAction(PURGE_STORE_ACTION)<PurgeResponse>(),
};
