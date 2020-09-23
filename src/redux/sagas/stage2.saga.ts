import { put, call, StrictEffect, takeEvery, select, fork } from 'redux-saga/effects';
import { Stage2Action, TournamentAction } from 'redux/actions';
import { fetchStage2, updateCells, deleteStage2 } from 'redux/services/stage2.service';
import { FetchStage2Response, DeleteStage2Response } from '@common/models';
import { TournamentSelector } from 'redux/selectors';
import { toast } from 'react-toastify';
import { TournamentProgress } from '@common/dto';

function* deleteStage2Saga(action: ReturnType<typeof Stage2Action.delete.request>): Generator<StrictEffect, void, any> {
  try {
    const response: DeleteStage2Response = yield call(deleteStage2, action.payload.tId);
    yield put(Stage2Action.delete.success(response));
    const tournament = yield select(TournamentSelector.getTournament);
    tournament.progress = TournamentProgress.Stage1;
    toast.success('Fase 2 eiminata...');
    yield put(TournamentAction.update.request({ tournament }));
  } catch (err) {
    yield put(Stage2Action.delete.failure(err));
    toast.error('Error while deleting Stage2');
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
    toast.error('Error while fetching Stage2');
  }
}

function* updateCellsSaga({
  payload: { cell1, cell2 },
}: ReturnType<typeof Stage2Action.updateCell.request>): Generator<StrictEffect, void, any> {
  try {
    yield fork(updateCells, cell1, cell2);
    yield put(Stage2Action.updateCell.success({}));
  } catch (err) {
    yield put(Stage2Action.updateCell.failure(err));
    toast.error('Error while updating Stage2');
  }
}

export const Stage2Sagas = [
  takeEvery(Stage2Action.fetchStage2.request, fetchStage2Saga),
  takeEvery(Stage2Action.updateCell.request, updateCellsSaga),
  takeEvery(Stage2Action.delete.request, deleteStage2Saga),
];
