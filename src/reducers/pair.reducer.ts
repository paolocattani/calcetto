import { createReducer, Action } from 'typesafe-actions';
import { PairState } from 'models';
import { PairAction } from 'actions';

const initialState: PairState = {
  isLoading: false,
};

export const PairReducer = createReducer<PairState, Action>(initialState)
  // Request
  .handleAction([PairAction.getPairs.request], (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  }))
  // Failure
  .handleAction([PairAction.getPairs.failure], (state, { payload: { message } }) => ({
    ...state,
    errorMessage: message,
    isLoading: false,
  }))
  // Fetch Tournament
  .handleAction(PairAction.getPairs.success, (state, { payload: { results } }) => ({
    ...state,
    pairsList: results,
    isLoading: false,
  }));
