import { createReducer, Action } from 'typesafe-actions';
import { Stage1State, Stage1Row } from 'models';
import { Stage1Action } from 'actions';

const initialState: Stage1State = {
  isLoading: false,
};

export const Stage1Reducer = createReducer<Stage1State, Action>(initialState)
  // Request
  .handleAction([Stage1Action.setSelectedPairs], (state, { payload: { stageName, rows } }) => {
    const selected = state.selectedPairs ? state.selectedPairs : new Map<string, Stage1Row[]>();
    selected.set(stageName, rows);
    return {
      ...state,
      selectedPairs: selected,
      isLoading: true,
    };
  });
