import { PlayerDTO } from './player.model';

export interface PairState {
  // Pairs selected for stage1
  pairList?: PairDTO[];
  // Loading
  isLoading: boolean;
}

export interface PairDTO {
  id: number | null;
  rowNumber?: number;
  tId: number;
  alias?: string;
  stage1Name: string;
  paid1: boolean;
  paid2: boolean;
  player1Id?: number;
  player1?: PlayerDTO;
  player2Id?: number;
  player2?: PlayerDTO;
  placement: number;
  label?: string;
}

// Requests
export interface FetchPairsRequest {
  tId?: number;
}
export interface FetchPairsResponse {
  results: PairDTO[];
}

// Requests
export interface PostPairsRequest {
  models: PairDTO[];
}
export interface PostPairsResponse {
  results: PairDTO[];
}
