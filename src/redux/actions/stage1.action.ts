import { createAsyncAction, createAction } from 'typesafe-actions';
import {
  WatchStage1Request,
  WatchStage1Response,
  FetchStage1Response,
  FetchStage1Request,
  UpdateCellRequest,
  UpdateCellResponse,
  UpdatePlacementRequest,
  UpdatePlacementResponse,
  SelectPairsRequest,
  SelectPairsResponse,
} from '../../@common/models';
import { defaultAsyncParams, PurgeResponse, PURGE_STORE_ACTION } from './constants';

const actionName = '[Stage1]';

export const Stage1Action = {
  // Update Selected Pairs
  updateSelectedPairs: createAsyncAction(...defaultAsyncParams(actionName, 'Selected Pairs Stage1'))<
    SelectPairsRequest,
    SelectPairsResponse,
    Error
  >(),

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
  updatePlacement: createAsyncAction(...defaultAsyncParams(actionName, 'Update Placement Stage1'))<
    UpdatePlacementRequest,
    UpdatePlacementResponse,
    Error
  >(),
  purge: createAction(PURGE_STORE_ACTION)<PurgeResponse>(),
};
