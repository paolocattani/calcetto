import { createReducer, Action } from 'typesafe-actions';
import { Stage1State, Stage1Row } from 'redux/models';
import { Stage1Action } from 'redux/actions';
import { getEmptyRowModel } from 'components/Pair/helper';

const initialState: Stage1State = {
  needRefresh: false,
  selectedPairs: [getEmptyRowModel('placeholder')],
  isLoading: false,
};

export const Stage1Reducer = createReducer<Stage1State, Action>(initialState)
  // Gestione Watcher
  // All'avvio del watcher reimposto needRefresh
  .handleAction([Stage1Action.stage1Watcher.request], (state) => ({ ...state, needRefresh: false }))
  .handleAction([Stage1Action.stage1Watcher.failure], (state) => ({ ...state }))
  .handleAction([Stage1Action.stage1Watcher.success], (state) => ({ ...state, needRefresh: true }))
  //
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

    return {
      ...state,
      selectedRows: selected,
      selectedPairs,
      isLoading: true,
    };
  });
