import { put, call, StrictEffect, takeEvery } from 'redux-saga/effects';
import { PairAction } from 'redux/actions';
import { fetchPairs } from 'redux/services/pair.service';
import { FetchPairsResponse } from 'redux/models';

function* getPairsSaga(action: ReturnType<typeof PairAction.fetch.request>): Generator<StrictEffect, void, any> {
  try {
    const response: FetchPairsResponse = yield call(fetchPairs, action.payload);
    yield put(PairAction.fetch.success(response));
  } catch (err) {
    yield put(PairAction.fetch.failure(err));
  }
}

export const PairsSagas = [takeEvery(PairAction.fetch.request, getPairsSaga)];
