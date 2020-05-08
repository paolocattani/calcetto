import { PairDTO } from './pair.model';

export interface Stage2State {
  isLoading: boolean;
  cells?: ICell[][];
}

export interface ICell {
  id: number;
  parentId: number;
  pair?: PairDTO;
  name?: string;
  winner: boolean;
  placement?: number;
}

// Request / Response
export interface FetchStage2Request {
  tournamentId: number;
  count: number;
}
export interface FetchStage2Response {
  cells?: ICell[][];
}

// TODO:
export interface UpdateStage2CellRequest {
  cell1: ICell;
  cell2: ICell;
}
export interface UpdateStage2CellResponse {}
