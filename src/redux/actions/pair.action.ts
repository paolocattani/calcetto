import { createAsyncAction, createAction } from 'typesafe-actions';
import { defaultAsyncParams, PurgeResponse } from './constants';
import { FetchPairsRequest, FetchPairsResponse } from 'redux/models';

const actionName = '[Pair]';

export const PairAction = {
  // Fetch Pairs
  fetchPairs: createAsyncAction(...defaultAsyncParams(actionName, 'Fetch Pairs'))<
    FetchPairsRequest,
    FetchPairsResponse,
    Error
  >(),
  purge: createAction('persist/PURGE')<PurgeResponse>(),
};
