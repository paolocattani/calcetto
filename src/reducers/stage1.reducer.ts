import { createReducer, Action } from 'typesafe-actions';
import { Stage1State } from 'models';
import { Stage1Action } from 'actions';

const initialState: Stage1State = {
  selectedPairs: [],
  isLoading: false,
};

export const Stage1Reducer = createReducer<Stage1State, Action>(initialState)
  // Request
  .handleAction([Stage1Action.setSelectedPairs], (state, { payload }) => ({
    ...state,
    selectedPairs: payload || [],
    isLoading: true,
  }));
