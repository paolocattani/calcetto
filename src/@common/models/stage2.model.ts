import { ICell, PairDTO } from '../dto';
import { GenericReponse } from './common.models';

export interface Stage2State {
	isLoading: boolean;
	toogleRefresh: boolean;
	count?: number;
	cells?: Array<Array<ICell>>;
}

// Request / Response
export interface FetchStage2PairsRequest {
	tournamentId: number;
}
export interface FetchStage2PairsResponse extends GenericReponse {
	pairs: Array<PairDTO>;
}
export interface CountStage2PairsRequest {
	tournamentId: number;
}
export interface CountStage2PairsResponse extends GenericReponse {
	count: number;
}
export interface FetchStage2Request {
	tournamentId: number;
	count?: number;
}
export interface FetchStage2Response extends GenericReponse {
	cells: Array<Array<ICell>>;
	count: number;
}

export interface UpdateStage2CellRequest {
	cell1: ICell;
	cell2: ICell | null;
}
export interface UpdateStage2CellResponse extends GenericReponse {}

export interface DeleteStage2Request {
	tId: number;
}
export interface DeleteStage2Response extends GenericReponse {}
export interface Stage2Error extends GenericReponse {}
