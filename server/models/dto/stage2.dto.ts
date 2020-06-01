import { PairDTO } from './pair.dto';

export interface IStage2FE {
  tournamentId: number;
  pairId: number;
  step: number;
  order: number;
  rank: number;
}

export interface ICell {
  matchId: number;
  cellRowIndex: number;
  cellColIndex: number;
  parentId: number;
  pair?: PairDTO;
  name?: string;
  isWinner: boolean;
  placement?: number;
}
