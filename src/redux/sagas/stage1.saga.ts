import { Stage1Action } from 'redux/actions';
import { takeLatest, StrictEffect, call, take, takeEvery } from 'redux-saga/effects';
import { createStage1Channel, fetchStage1, updateCellStage1, updatePlacement } from 'redux/services/stage1.service';
import {
  FetchStage1Request,
  FetchStage1Response,
  SelectPairsRequest,
  SelectPairsResponse,
  UpdateCellRequest,
  UpdateCellResponse,
  UpdatePlacementRequest,
  UpdatePlacementResponse,
} from '@common/models';
import { entityLifeCycle } from './utils';
import { selectPairs } from 'redux/services/pair.service';

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

function* fetchSaga({
  payload,
}: ReturnType<typeof Stage1Action.fetchStage1.request>): Generator<StrictEffect, void, any> {
  yield entityLifeCycle<FetchStage1Request, FetchStage1Response>(Stage1Action.fetchStage1, fetchStage1, payload);
}

function* updateCellSaga({
  payload,
}: ReturnType<typeof Stage1Action.updateCellStage1.request>): Generator<StrictEffect, void, any> {
  yield entityLifeCycle<UpdateCellRequest, UpdateCellResponse>(
    Stage1Action.updateCellStage1,
    updateCellStage1,
    payload
  );
}

function* updatePlacementSaga({
  payload,
}: ReturnType<typeof Stage1Action.updatePlacement.request>): Generator<StrictEffect, void, any> {
  yield entityLifeCycle<UpdatePlacementRequest, UpdatePlacementResponse>(
    Stage1Action.updateCellStage1,
    updatePlacement,
    payload
  );
}

function* updateSelectedPairsSaga({
  payload,
}: ReturnType<typeof Stage1Action.updateSelectedPairs.request>): Generator<StrictEffect, void, any> {
  yield entityLifeCycle<SelectPairsRequest, SelectPairsResponse>(
    Stage1Action.updateSelectedPairs,
    selectPairs,
    payload
  );
}

export const Stage1Sagas = [
  takeLatest(Stage1Action.stage1Watcher.request, watchStage1Saga),
  takeEvery(Stage1Action.fetchStage1.request, fetchSaga),
  takeEvery(Stage1Action.updateCellStage1.request, updateCellSaga),
  takeEvery(Stage1Action.updatePlacement.request, updatePlacementSaga),
  takeEvery(Stage1Action.updateSelectedPairs.request, updateSelectedPairsSaga),
];
