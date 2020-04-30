import { PairDTO } from './pair.model';

export interface Stage2State {}

export interface ICell {
  id: number;
  parentId: number;
  pair?: PairDTO;
  name?: string;
  winner: boolean;
  placement?: number;
}
