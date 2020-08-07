import { createAction, createAsyncAction } from 'typesafe-actions';
import {
  Stage1Row,
  WatchStage1Request,
  WatchStage1Response,
  FetchStage1Response,
  FetchStage1Request,
  UpdateCellRequest,
  UpdateCellResponse,
  UpdatePlacementRequest,
  UpdatePlacementResponse,
} from 'redux/models';
import { defaultAsyncParams } from './constants';

const actionName = '[Stage1]';

export const Stage1Action = {
  // Update Selected Pairs
  setSelectedPairs: createAction(`${actionName} Set Selected Pairs`)<{ stageName: string; rows: Stage1Row[] }>(),
  // watcher
  stage1Watcher: createAsyncAction(...defaultAsyncParams(actionName, 'Stage1 Watcher'))<
    WatchStage1Request,
    WatchStage1Response,
    Error
  >(),
  fetchStage1: createAsyncAction(...defaultAsyncParams(actionName, 'Fetch Stage1'))<
    FetchStage1Request,
    FetchStage1Response,
    Error
  >(),
  updateCellStage1: createAsyncAction(...defaultAsyncParams(actionName, 'Update Cell Stage1'))<
    UpdateCellRequest,
    UpdateCellResponse,
    Error
  >(),
  updatePlacement: createAsyncAction(...defaultAsyncParams(actionName, 'Update Placement Watcher'))<
    UpdatePlacementRequest,
    UpdatePlacementResponse,
    Error
  >(),
};
