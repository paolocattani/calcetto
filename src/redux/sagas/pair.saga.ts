import { StrictEffect, takeEvery } from 'redux-saga/effects';
import { PairAction } from '../actions';
import { fetchPairs } from '../services/pair.service';
import {FetchPairsResponse, FetchPairsRequest, PairError} from '../../@common/models';
import { entityLifeCycle } from './utils';

function* getPairsSaga({ payload }: ReturnType<typeof PairAction.fetch.request>): Generator<StrictEffect, void, any> {
  yield* entityLifeCycle<FetchPairsRequest, FetchPairsResponse,PairError>(PairAction.fetch, fetchPairs, payload);
}

export const PairsSagas = [takeEvery(PairAction.fetch.request, getPairsSaga)];
