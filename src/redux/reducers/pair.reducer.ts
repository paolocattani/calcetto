import { createReducer, Action } from 'typesafe-actions';
import { PairState } from 'redux/models';
import { PairAction } from 'redux/actions';

export const initialPairState: PairState = {
  isLoading: false,
};

export const PairReducer = createReducer<PairState, Action>(initialPairState)
  // Request
  .handleAction([PairAction.fetchPairs.request], (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  }))
  // Failure
  .handleAction([PairAction.fetchPairs.failure], (state, { payload: { message } }) => ({
    ...state,
    errorMessage: message,
    isLoading: false,
  }))
  // Fetch Tournament
  .handleAction(PairAction.fetchPairs.success, (state, { payload: { results } }) => ({
    ...state,
    pairList: results,
    isLoading: false,
  }))
  .handleAction(PairAction.purge, () => initialPairState);
