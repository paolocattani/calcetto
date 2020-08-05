import { Stage1Action } from 'redux/actions';
import { takeLatest, StrictEffect, call, take } from 'redux-saga/effects';
import { createStage1Channel } from 'redux/services/stage1.service';

function* watchStage1Saga(
  action: ReturnType<typeof Stage1Action.stage1Watcher.request>
): Generator<StrictEffect, void, any> {
  try {
    console.log('watchStage1Saga : start');
    const eventChannel = new EventSource('/sse/v1/session');
    const channel = yield call(createStage1Channel, eventChannel);
    while (true) {
      const message = yield take(channel);
    }
  } catch (err) {
    console.log('watchStage1Saga.err : ', err);
  }
}

export const Stage1Sagas = [takeLatest(Stage1Action.stage1Watcher.request, watchStage1Saga)];
