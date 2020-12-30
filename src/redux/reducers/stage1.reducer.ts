import { createReducer, Action } from 'typesafe-actions';
import { getEmptyPair, Stage1State } from '../../@common/models';
import { Stage1Action } from '../actions';
import { Stage1Row } from '../../@common/dto';

const emptyPair = getEmptyPair('-');
export const initialStage1State: Stage1State = {
  toogleRefresh: false,
  selectedPairs: [emptyPair],
  isLoading: false,
  stages: [],
};

export const Stage1Reducer = createReducer<Stage1State, Action>(initialStage1State)
  // SSE
  .handleAction([Stage1Action.reloadFromServer], (state) => ({ ...state, toogleRefresh: !state.toogleRefresh }))
  .handleAction([Stage1Action.resetPairs], (state) => ({ ...state, selectedPairs: [emptyPair] }))
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
    return {
      ...state,
      stages: [...state.stages.filter((s) => s.stageName !== stageName), newStage],
      isLoading: false,
    };
  })
  // Aggiornamento coppie selezionate dati vari gironi
  .handleAction([Stage1Action.updateSelectedPairs.success], (state, { payload: { stage1Name, stage1Rows } }) => {
    const selected = state.selectedRows ? state.selectedRows : new Map<string, Stage1Row[]>();
    selected.set(stage1Name, stage1Rows);

    const selectedPairs = state.selectedPairs
      ? [
          // Filtro selectedPairs
          //  e.id === null : mantengo il placeholder
          //  e.stage1Name !== stageName : matengo tutte le coppie che non appartengo al girone attuale
          ...state.selectedPairs.filter((e) => e.id === null || e.stage1Name !== stage1Name),
          ...stage1Rows.map((e) => e.pair),
        ]
      : [...stage1Rows.map((e) => e.pair)];

    return {
      ...state,
      selectedRows: selected,
      selectedPairs,
      isLoading: false,
    };
  })
  .handleAction(Stage1Action.reset, () => initialStage1State)
  .handleAction(Stage1Action.purge, () => initialStage1State);
