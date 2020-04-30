import { PairDTO } from './pair.model';

export interface Stage1State {
  isLoading: boolean;
  selectedPairs?: Map<string, Stage1Row[]>;
}

export interface Stage1Row {
  id: number;
  rowNumber: number;
  pair: PairDTO;
  [key: string]: number | PairDTO | null;
  total: number;
  place: number;
}
