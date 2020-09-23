import { StrictEffect, takeEvery } from 'redux-saga/effects';
import { PairAction } from 'redux/actions';
import { fetchPairs } from 'redux/services/pair.service';
import { FetchPairsResponse } from '@common/models';
import { entityLifeCicle } from './utils';

function* getPairsSaga({ payload }: ReturnType<typeof PairAction.fetch.request>): Generator<StrictEffect, void, any> {
  yield entityLifeCicle<FetchPairsResponse>(
    PairAction.fetch,
    fetchPairs,
    payload,
    'Coppie caricate...',
    'Errore in fase di caricamento...'
  );
}

export const PairsSagas = [takeEvery(PairAction.fetch.request, getPairsSaga)];
