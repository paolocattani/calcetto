import { PairDTO, Stage1Row } from '@common/dto';

export interface Stage1State {
  // Utilizzato per indicare se è necessario ricaricare i dati dal db
  // a seguito di un cambiamento causato da un'altro utente
  // TODO:
  needRefresh: boolean;
  isLoading: boolean;
  //Righe Stage1 selezionate nella forma di Mappa <Nome Girone, Lista Righe Selezionate>
  selectedRows?: Map<string, Array<Stage1Row>>;
  //Righe Stage1 selezionate, unite tali da essere usate poi su Stage2
  selectedPairs: Array<PairDTO>;
  // idea ( abbandonata per ora ) : creare un array contente gli stati di ogni girone.
  stages: Array<SingleStageState>;
}

// Rappresenta lo stato di un sinsolo girone
export interface SingleStageState {
  isLoading: boolean;
  autoOrder: boolean; // TODO:
  stageName: string;
  pairsList: Array<PairDTO>;
  rows: Array<Stage1Row>;
}

// Requests/ Responses
export interface WatchStage1Request {
  tounamentId: number;
}
export interface FetchStage1Request {
  stageName: string;
  pairsList: Array<PairDTO>;
}
export interface UpdateCellRequest {
  tId: number;
  stageName: string;
  score: string;
  pair1Id: number;
  pair2Id: number;
}
export interface UpdatePlacementRequest {
  rows: Array<{ id: number; placement: number }>;
}
export interface UpdateSelectedPairsRequest {
  stageName: string;
  rows: Array<Stage1Row>;
}

export interface WatchStage1Response {
  needRefresh: boolean;
}
export interface FetchStage1Response {
  stageName: string;
  pairsList: Array<PairDTO>;
  rows: Array<Stage1Row>;
}
export interface UpdateCellResponse {}
export interface UpdatePlacementResponse {}
export interface UpdateSelectedPairsResponse {
  stageName: string;
  rows: Array<Stage1Row>;
}
