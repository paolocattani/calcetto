import { put, takeEvery, select } from 'redux-saga/effects';
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
import { TournamentDTO, TournamentProgress } from '../../@common/dto';
import { entityLifeCycle } from './utils';
import { EventAction } from '../actions/event.action';

function* deleteStage2Saga({ payload }: ReturnType<typeof Stage2Action.delete.request>) {
	const tournament: TournamentDTO = yield select(TournamentSelector.getTournament);
	const onSuccess = function* () {
		tournament.progress = TournamentProgress.Stage1;
		yield put(TournamentAction.update.request({ tournament, fromProgress: TournamentProgress.Stage2 }));
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
	const onSuccess = function* (/*response: UpdateStage2CellResponse*/) {
		yield put(EventAction.updateStage2.request({ tournament: payload.tournament }));
	};
	yield* entityLifeCycle<UpdateStage2CellRequest, UpdateStage2CellResponse, Stage2Error>(
		Stage2Action.updateCell,
		updateCells,
		payload,
		onSuccess
	);
}

export const Stage2Sagas = [
	takeEvery(Stage2Action.fetchStage2.request, fetchStage2Saga),
	takeEvery(Stage2Action.updateCell.request, updateCellsSaga),
	takeEvery(Stage2Action.delete.request, deleteStage2Saga),
];
