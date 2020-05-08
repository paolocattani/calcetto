import { createReducer, Action } from 'typesafe-actions';
import { Stage2State } from 'models';
import { Stage1Action } from 'actions';

const initialState: Stage2State = {
  isLoading: false,
};

export const Stage2Reducer = createReducer<Stage2State, Action>(initialState)
  // Request
  .handleAction([Stage1Action.setSelectedPairs], (state, { payload: { stageName, rows } }) => {
    return {
      ...state,
      isLoading: true,
    };
  });
