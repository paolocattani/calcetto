import { createReducer, Action } from 'typesafe-actions';
import { PairState } from '@common/models';
import { PairAction } from 'redux/actions';

export const initialPairState: PairState = {
  isLoading: false,
};

export const PairReducer = createReducer<PairState, Action>(initialPairState)
  // Request
  .handleAction([PairAction.fetch.request], (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  }))
  // Failure
  .handleAction([PairAction.fetch.failure], (state, { payload: { message } }) => ({
    ...state,
    errorMessage: message,
    isLoading: false,
  }))
  // Fetch Tournament
  .handleAction(PairAction.fetch.success, (state, { payload: { results } }) => ({
    ...state,
    pairList: results,
    isLoading: false,
  }))
  .handleAction(PairAction.purge, () => initialPairState);
