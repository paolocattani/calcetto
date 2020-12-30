import { createAsyncAction, createAction } from 'typesafe-actions';
import {
	FetchStage1Response,
	FetchStage1Request,
	UpdateCellRequest,
	UpdateCellResponse,
	UpdatePlacementRequest,
	UpdatePlacementResponse,
	SelectPairsRequest,
	SelectPairsResponse, Stage1Error,
} from '../../@common/models';
import {defaultAsyncParams, PurgeResponse, PURGE_STORE_ACTION, defaultParam} from './constants';

const actionName = '[Stage1]';

export const Stage1Action = {
  // Update Selected Pairs
  updateSelectedPairs: createAsyncAction(...defaultAsyncParams(actionName, 'Selected Pairs Stage1'))<
    SelectPairsRequest,
    SelectPairsResponse,
		Stage1Error
  >(),
  // watcher
  fetchStage1: createAsyncAction(...defaultAsyncParams(actionName, 'Fetch Stage1'))<
    FetchStage1Request,
    FetchStage1Response,
		Stage1Error
  >(),
  updateCellStage1: createAsyncAction(...defaultAsyncParams(actionName, 'Update Cell Stage1'))<
    UpdateCellRequest,
    UpdateCellResponse,
		Stage1Error
  >(),
  updatePlacement: createAsyncAction(...defaultAsyncParams(actionName, 'Update Placement Stage1'))<
    UpdatePlacementRequest,
    UpdatePlacementResponse,
		Stage1Error
    >(),
  reloadFromServer: createAction(...defaultParam(actionName, 'Stage1 Watcher'))<{}>(),
  resetPairs: createAction(...defaultParam(actionName, 'Stage1 Reset Pairs'))<{}>(),
  reset: createAction(...defaultParam(actionName, 'Stage1 Reset'))<{}>(),
  purge: createAction(PURGE_STORE_ACTION)<PurgeResponse>(),
};
