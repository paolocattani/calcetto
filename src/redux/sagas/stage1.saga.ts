import { Stage1Action } from '../actions';
import { StrictEffect, takeEvery } from 'redux-saga/effects';
import { fetchStage1, updateCellStage1, updatePlacement } from '../services/stage1.service';
import {
	FetchStage1Request,
	FetchStage1Response,
	SelectPairsRequest,
	SelectPairsResponse, Stage1Error,
	UpdateCellRequest,
	UpdateCellResponse,
	UpdatePlacementRequest,
	UpdatePlacementResponse,
} from '../../@common/models';
import { entityLifeCycle } from './utils';
import { selectPairs } from '../services/pair.service';

function* fetchSaga({ payload }: ReturnType<typeof Stage1Action.fetchStage1.request>): Generator<StrictEffect, void, any> {
  yield* entityLifeCycle<FetchStage1Request, FetchStage1Response,Stage1Error>(Stage1Action.fetchStage1, fetchStage1, payload);
}

function* updateCellSaga({payload,}: ReturnType<typeof Stage1Action.updateCellStage1.request>): Generator<StrictEffect, void, any> {
  yield* entityLifeCycle<UpdateCellRequest, UpdateCellResponse,Stage1Error>( Stage1Action.updateCellStage1, updateCellStage1,payload );
}

function* updatePlacementSaga({ payload }: ReturnType<typeof Stage1Action.updatePlacement.request>): Generator<StrictEffect, void, any> {
  yield* entityLifeCycle<UpdatePlacementRequest, UpdatePlacementResponse,Stage1Error>(Stage1Action.updatePlacement, updatePlacement, payload );
}

function* updateSelectedPairsSaga({ payload }: ReturnType<typeof Stage1Action.updateSelectedPairs.request>): Generator<StrictEffect, void, any> {
  yield* entityLifeCycle<SelectPairsRequest, SelectPairsResponse,Stage1Error>(Stage1Action.updateSelectedPairs, selectPairs, payload );
}

export const Stage1Sagas = [
  takeEvery(Stage1Action.fetchStage1.request, fetchSaga),
  takeEvery(Stage1Action.updateCellStage1.request, updateCellSaga),
  takeEvery(Stage1Action.updatePlacement.request, updatePlacementSaga),
  takeEvery(Stage1Action.updateSelectedPairs.request, updateSelectedPairsSaga),
];
