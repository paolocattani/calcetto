import { PairDTO } from '@common/dto';

export interface PairState {
  // Pairs selected for stage1
  pairList?: PairDTO[];
  // Loading
  isLoading: boolean;
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
