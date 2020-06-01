import { PairDTO } from './pair.model';

export interface Stage1State {
  // Utilizzato per indicare se è necessario ricaricare i dati dal db
  // a seguito di un cambiamento causato da un'altro utente
  needRefresh: boolean;
  isLoading: boolean;
  selectedRows?: Map<string, Stage1Row[]>;
  selectedPairs: PairDTO[];
}

export interface Stage1Row {
  id: string;
  rowNumber: number;
  pair: PairDTO;
  [key: string]: string | number | PairDTO | null;
  total: number;
  placement: number;
}

export interface WatchStage1Request {
  tounamentId: number;
}

export interface WatchStage1Response {
  needRefresh: boolean;
}
