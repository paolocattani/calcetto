import { PairDTO } from '../dto';
import { GenericReponse } from './common.models';

export interface PairState {
  // Pairs selected for stage1
  pairsList?: Array<PairDTO>;
  // Loading
  isLoading: boolean;
  isSaving: boolean;
}

// Requests
export interface FindAliasRequest {
  player1Id: number | string;
  player2Id: number | string;
}
export interface FetchPairsRequest {
  tId: number;
}
export interface DeletePairsRequest {
  pairsList: Array<PairDTO>;
}
export interface SavePairRequest {
  pair: PairDTO;
}
export interface SelectPairsRequest {
  stage1Name: string;
  pairsList: Array<PairDTO>;
}
// Response
export interface FindAliasResponse extends GenericReponse {
  alias: string;
}
export interface FetchPairsResponse extends GenericReponse {
  pairsList: Array<PairDTO>;
}
export interface DeletePairsResponse extends GenericReponse {
  pairsList: Array<PairDTO>;
}
export interface SavePairResponse extends GenericReponse {
  pair: PairDTO;
}
export interface SelectPairsResponse extends GenericReponse {}
