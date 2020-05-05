import { createReducer, Action } from 'typesafe-actions';
import { Stage1State, Stage1Row } from 'models';
import { Stage1Action } from 'actions';
import { getEmptyRowModel } from 'components/Pair/helper';

const initialState: Stage1State = {
  selectedPairs: [getEmptyRowModel('placeholder')],
  isLoading: false,
};

export const Stage1Reducer = createReducer<Stage1State, Action>(initialState)
  // Request
  .handleAction([Stage1Action.setSelectedPairs], (state, { payload: { stageName, rows } }) => {
    const selected = state.selectedRows ? state.selectedRows : new Map<string, Stage1Row[]>();
    selected.set(stageName, rows);

    const selectedPairs = state.selectedPairs
      ? [
          // Filtro selectedPairs
          //  e.id === null : mantengo il placeholder
          //  e.stage1Name !== stageName : matengo tutte le coppie che non appartengo al girone attuale
          ...state.selectedPairs.filter((e) => e.id === null || e.stage1Name !== stageName),
          ...rows.map((e) => e.pair),
        ]
      : [...rows.map((e) => e.pair)];
    console.log('selectedPairs : ', selectedPairs);

    return {
      ...state,
      selectedRows: selected,
      selectedPairs,
      isLoading: true,
    };
  });
