import { put, call, StrictEffect, takeEvery } from 'redux-saga/effects';
import { Stage2Action } from 'actions';
import { fetchStage2, updateCells, deleteStage2 } from 'services/stage2.service';
import { FetchStage2Response } from 'models';

function* deleteStage2Saga(action: ReturnType<typeof Stage2Action.delete.request>): Generator<StrictEffect, void, any> {
  try {
    const response: FetchStage2Response = yield call(deleteStage2, action.payload.tId);
    yield put(Stage2Action.fetchStage2.success(response));
  } catch (err) {
    yield put(Stage2Action.fetchStage2.failure(err));
  }
}

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

function* updateCellsSaga({
  payload: { cell1, cell2 },
}: ReturnType<typeof Stage2Action.updateCell.request>): Generator<StrictEffect, void, any> {
  try {
    yield call(updateCells, cell1, cell2);
    yield put(Stage2Action.updateCell.success({}));
  } catch (err) {
    yield put(Stage2Action.updateCell.failure(err));
  }
}

export const Stage2Sagas = [
  takeEvery(Stage2Action.fetchStage2.request, fetchStage2Saga),
  takeEvery(Stage2Action.updateCell.request, updateCellsSaga),
  takeEvery(Stage2Action.delete.request, deleteStage2Saga),
];
