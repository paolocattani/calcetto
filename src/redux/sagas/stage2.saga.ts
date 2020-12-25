import { put, call, StrictEffect, takeEvery, select, fork } from 'redux-saga/effects';
import { Stage2Action, TournamentAction } from '../actions';
import { fetchStage2, updateCells, deleteStage2 } from '../services/stage2.service';
import {
	FetchStage2Response,
	DeleteStage2Response,
	DeleteStage2Request,
	Stage2Error,
	FetchStage2Request,
	UpdateStage2CellRequest,
	UpdateStage2CellResponse,
} from '../../@common/models';
import { TournamentSelector } from '../selectors';
import { TournamentProgress } from '../../@common/dto';
import { entityLifeCycle } from './utils';

function* deleteStage2Saga({ payload }: ReturnType<typeof Stage2Action.delete.request>) {
	const onSuccess = function* () {
		const tournament = yield select(TournamentSelector.getTournament);
		tournament.progress = TournamentProgress.Stage1;
		yield put(TournamentAction.update.request({ tournament }));
	};
	yield* entityLifeCycle<DeleteStage2Request, DeleteStage2Response, Stage2Error>(
		Stage2Action.delete,
		deleteStage2,
		payload,
		onSuccess
	);
}

function* fetchStage2Saga({ payload }: ReturnType<typeof Stage2Action.fetchStage2.request>) {
	yield* entityLifeCycle<FetchStage2Request, FetchStage2Response, Stage2Error>(
		Stage2Action.fetchStage2,
		fetchStage2,
		payload
	);
}

function* updateCellsSaga({ payload }: ReturnType<typeof Stage2Action.updateCell.request>) {
	yield* entityLifeCycle<UpdateStage2CellRequest, UpdateStage2CellResponse, Stage2Error>(
		Stage2Action.updateCell,
		updateCells,
		payload
	);
}

export const Stage2Sagas = [
	takeEvery(Stage2Action.fetchStage2.request, fetchStage2Saga),
	takeEvery(Stage2Action.updateCell.request, updateCellsSaga),
	takeEvery(Stage2Action.delete.request, deleteStage2Saga),
];
