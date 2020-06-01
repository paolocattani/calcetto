import { createAction, createAsyncAction } from 'typesafe-actions';
import { Stage1Row, WatchStage1Request, WatchStage1Response } from 'models';
import { Success, Failure } from './constants';

const ActionName = '[Stage1]';

export const Stage1Action = {
  // get selected tournament
  setSelectedPairs: createAction(`${ActionName} Set Selected Pairs`)<{ stageName: string; rows: Stage1Row[] }>(),
  // watcher
  stage1Watcher: createAsyncAction(
    `${ActionName} Watch Stage1 ${Request}`,
    `${ActionName} Watch Stage1 ${Success}`,
    `${ActionName} Watch Stage1 ${Failure}`
  )<WatchStage1Request, WatchStage1Response, Error>(),
};
