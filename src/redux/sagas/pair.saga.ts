import { put, call, StrictEffect, takeEvery } from 'redux-saga/effects';
import { PairAction } from 'redux/actions';
import { fetchPairs } from 'redux/services/pair.service';
import { FetchPairsResponse } from 'redux/models';

function* getPairsSaga(action: ReturnType<typeof PairAction.fetchPairs.request>): Generator<StrictEffect, void, any> {
  try {
    const response: FetchPairsResponse = yield call(fetchPairs, action.payload);
    yield put(PairAction.fetchPairs.success(response));
  } catch (err) {
    yield put(PairAction.fetchPairs.failure(err));
  }
}

export const PairsSagas = [takeEvery(PairAction.fetchPairs.request, getPairsSaga)];
