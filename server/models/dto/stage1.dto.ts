import { PairDTO } from './pair.dto';

export interface Stage1Row {
  id: string;
  rowNumber: number;
  pair: PairDTO;
  [key: string]: string | number | PairDTO | null;
  total: number;
  placement: number;
}
