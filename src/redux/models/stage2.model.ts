import { PairDTO } from './pair.model';

export interface Stage2State {
  isLoading: boolean;
  rowsNumber?: number;
  cells?: ICell[][];
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

// Request / Response
export interface FetchStage2Request {
  tournamentId: number;
  count: number;
}
export interface FetchStage2Response {
  cells: ICell[][];
  rowsNumber: number;
}

export interface UpdateStage2CellRequest {
  cell1: ICell;
  cell2: ICell | null;
}
export interface UpdateStage2CellResponse {}

export interface DeleteStage2Request {
  tId: number;
}
export interface DeleteStage2Response {}
