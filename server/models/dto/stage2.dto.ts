import { PairDTO } from './pair.dto';

export interface IStage2FE {
  tournamentId: number;
  pairId: number;
  step: number;
  order: number;
  rank: number;
}

export interface ICell {
  id: number;
  parentId: number;
  pair?: PairDTO;
  name?: string;
  winner: boolean;
  placement?: number;
}
