import { createAsyncAction } from 'typesafe-actions';
import { Failure, Success, Request } from './constants';
import { FetchPairsRequest, FetchPairsResponse } from 'models';

const ActionName = '[Pair]';

export const PairAction = {
  // fetch tournaments
  getPairs: createAsyncAction(
    `${ActionName} Get Pair ${Request}`,
    `${ActionName} Get Pair ${Success}`,
    `${ActionName} Get Pair ${Failure}`
  )<FetchPairsRequest, FetchPairsResponse, Error>(),
};
