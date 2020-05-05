import { PairDTO } from './pair.model';

export interface Stage1State {
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
