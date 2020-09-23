import { StrictEffect, takeEvery } from 'redux-saga/effects';
import { PairAction } from 'redux/actions';
import { fetchPairs } from 'redux/services/pair.service';
import { FetchPairsResponse, FetchPairsRequest } from '@common/models';
import { entityLifeCycle } from './utils';

function* getPairsSaga({ payload }: ReturnType<typeof PairAction.fetch.request>): Generator<StrictEffect, void, any> {
  yield entityLifeCycle<FetchPairsRequest, FetchPairsResponse>(PairAction.fetch, fetchPairs, payload);
}

export const PairsSagas = [takeEvery(PairAction.fetch.request, getPairsSaga)];
