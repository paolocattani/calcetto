import { Stage1Action } from 'redux/actions';
import { takeLatest, StrictEffect, call, take, put, takeEvery, fork } from 'redux-saga/effects';
import {
  createStage1Channel,
  fetchStage1,
  updateCellStage1,
  updatePlacement,
  updateSelectedPairs,
} from 'redux/services/stage1.service';
import { FetchStage1Response } from '@common/models';
import { toast } from 'react-toastify';

// TODO:
function* watchStage1Saga(
  action: ReturnType<typeof Stage1Action.stage1Watcher.request>
): Generator<StrictEffect, void, any> {
  try {
    console.log('watchStage1Saga : start');
    const eventChannel = new EventSource('/sse/v1/session');
    const channel = yield call(createStage1Channel, eventChannel);
    while (true) {
      const message = yield take(channel);
      console.log('watchStage1Saga.message : ', message);
    }
  } catch (err) {
    console.log('watchStage1Saga.err : ', err);
  }
}

function* fetchSaga(action: ReturnType<typeof Stage1Action.fetchStage1.request>): Generator<StrictEffect, void, any> {
  try {
    const response: FetchStage1Response = yield call(fetchStage1, action.payload);
    yield put(Stage1Action.fetchStage1.success(response));
  } catch (err) {
    yield put(Stage1Action.fetchStage1.failure(err));
    toast.error('Error while fetching Stage2');
  }
}

function* updateCellSaga(
  action: ReturnType<typeof Stage1Action.updateCellStage1.request>
): Generator<StrictEffect, void, any> {
  try {
    yield fork(updateCellStage1, action.payload);
    yield put(Stage1Action.updateCellStage1.success({}));
  } catch (err) {
    yield put(Stage1Action.updateCellStage1.failure(err));
    toast.error('Error while fetching Stage2');
  }
}

function* updatePlacementSaga(
  action: ReturnType<typeof Stage1Action.updatePlacement.request>
): Generator<StrictEffect, void, any> {
  try {
    yield fork(updatePlacement, action.payload);
    yield put(Stage1Action.updatePlacement.success({}));
  } catch (err) {
    yield put(Stage1Action.updatePlacement.failure(err));
    toast.error('Error while fetching Stage2');
  }
}

function* updateSelectedPairsSaga(
  action: ReturnType<typeof Stage1Action.updateSelectedPairs.request>
): Generator<StrictEffect, void, any> {
  try {
    yield fork(updateSelectedPairs, action.payload);
    yield put(Stage1Action.updateSelectedPairs.success(action.payload));
  } catch (err) {
    console.error('Error updating selected pairs : ', err);
    yield put(Stage1Action.updateSelectedPairs.success(action.payload));
    toast.error('Error updating selected pairs');
  }
}

export const Stage1Sagas = [
  takeLatest(Stage1Action.stage1Watcher.request, watchStage1Saga),
  takeEvery(Stage1Action.fetchStage1.request, fetchSaga),
  takeEvery(Stage1Action.updateCellStage1.request, updateCellSaga),
  takeEvery(Stage1Action.updatePlacement.request, updatePlacementSaga),
  takeEvery(Stage1Action.updateSelectedPairs.request, updateSelectedPairsSaga),
];
