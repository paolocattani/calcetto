import { ICell, PairDTO } from '../dto';
import { GenericResponse } from './common.models';

export interface Stage2State {
	isLoading: boolean;
	count?: number;
	cells?: Array<Array<ICell>>;
}

// Request / Response
export interface FetchStage2PairsRequest {
	tournamentId: number;
}
export interface FetchStage2PairsResponse extends GenericResponse {
	pairs: Array<PairDTO>;
}
export interface CountStage2PairsRequest {
	tournamentId: number;
}
export interface CountStage2PairsResponse extends GenericResponse {
	count: number;
}
export interface FetchStage2Request {
	tournamentId: number;
	count?: number;
}
export interface FetchStage2Response extends GenericResponse {
	cells: Array<Array<ICell>>;
	count: number;
}

export interface UpdateStage2CellRequest {
	cells: Array<ICell>;
}
export interface UpdateStage2CellResponse extends GenericResponse {}

export interface DeleteStage2Request {
	tId: number;
}
export interface DeleteStage2Response extends GenericResponse {}
export interface Stage2Error extends GenericResponse {}
