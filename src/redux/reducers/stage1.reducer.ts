import { createReducer, Action } from 'typesafe-actions';
import { Stage1State, Stage1Row } from 'redux/models';
import { Stage1Action } from 'redux/actions';
import { getEmptyRowModel } from 'components/Pair/helper';

const initialState: Stage1State = {
  needRefresh: false,
  selectedPairs: [getEmptyRowModel('-')],
  isLoading: false,
  stages: [],
};

export const Stage1Reducer = createReducer<Stage1State, Action>(initialState)
  // Gestione Watcher
  // All'avvio del watcher reimposto needRefresh
  .handleAction([Stage1Action.stage1Watcher.request], (state) => ({ ...state, needRefresh: false }))
  .handleAction([Stage1Action.stage1Watcher.failure], (state) => ({ ...state }))
  .handleAction([Stage1Action.stage1Watcher.success], (state) => ({ ...state, needRefresh: true }))
  //
  .handleAction([Stage1Action.fetchStage1.request, Stage1Action.updateSelectedPairs.request], (state) => ({
    ...state,
    isLoading: true,
  }))
  .handleAction([Stage1Action.fetchStage1.failure, Stage1Action.updateSelectedPairs.failure], (state) => ({
    ...state,
    isLoading: false,
  }))
  // Aggiornamento valore cella/posizionamento
  .handleAction([Stage1Action.updateCellStage1.success, Stage1Action.updatePlacement.success], (state) => ({
    ...state,
    isLoading: false,
  }))
  // Reperimento dati
  .handleAction([Stage1Action.fetchStage1.success], (state, { payload: { stageName, rows, pairsList } }) => {
    const currentStage = state.stages.filter((s) => s.stageName === stageName);
    const newStage =
      currentStage && currentStage.length > 0
        ? { ...currentStage[0], rows }
        : { pairsList, stageName, rows, autoOrder: false, isLoading: false };
    const res1 = [...state.stages, newStage];
    const res2 = state.stages.filter((s) => s.stageName !== stageName).push(newStage);
    const res3 = [...state.stages.filter((s) => s.stageName !== stageName), newStage];
    console.log('Stage1Action.fetchStage1.success : ', res1, res2, res3);
    return {
      ...state,
      stages: res3,
      isLoading: false,
    };
  })
  // Aggiornamento coppie selezionate dati vari gironi
  .handleAction([Stage1Action.updateSelectedPairs.success], (state, { payload: { stageName, rows } }) => {
    console.log('[Stage1Action.updateSelectedPairs.success, Stage1Action.updateSelectedPairs.failure] : ');
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
      isLoading: false,
    };
  });
