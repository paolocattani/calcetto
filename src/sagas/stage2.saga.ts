import { put, call, StrictEffect, takeEvery } from 'redux-saga/effects';
import { PairAction, Stage2Action } from 'actions';
import { fetchStage2 } from 'services/stage2.service';
import { FetchStage2Response } from 'models';

function* fetchStage2Saga(
  action: ReturnType<typeof Stage2Action.fetchStage2.request>
): Generator<StrictEffect, void, any> {
  try {
    const response: FetchStage2Response = yield call(fetchStage2, action.payload);
    yield put(Stage2Action.fetchStage2.success(response));
  } catch (err) {
    yield put(Stage2Action.fetchStage2.failure(err));
  }
}

export const Stage2Sagas = [takeEvery(Stage2Action.fetchStage2.request, fetchStage2Saga)];
