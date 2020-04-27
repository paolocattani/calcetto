import { put, call, StrictEffect, takeEvery } from 'redux-saga/effects';
import { PairAction } from 'actions';
import { fetchPairs } from 'services/pair.service';
import { FetchPairsResponse } from 'models';

function* getPairsSaga(action: ReturnType<typeof PairAction.getPairs.request>): Generator<StrictEffect, void, any> {
  try {
    const response: FetchPairsResponse = yield call(fetchPairs, action.payload);
    console.log('getPairsSaga : ', response);

    yield put(PairAction.getPairs.success(response));
  } catch (err) {
    yield put(PairAction.getPairs.failure(err));
  }
}

export const PairsSagas = [takeEvery(PairAction.getPairs.request, getPairsSaga)];
