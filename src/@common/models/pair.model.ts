import * as H from 'history';
import { PairDTO, Stage1Row } from '../dto';
import { GenericResponse } from './common.models';
import { getEmptyPlayer } from './player.model';

export interface PairState {
	// Pairs selected for stage1
	pairsList?: Array<PairDTO>;
	// Loading
	isLoading: boolean;
	isSaving: boolean;
}

// Requests
export interface FindAliasRequest {
	player1Id: number;
	player2Id: number;
}
export interface FetchPairsRequest {
	tId: number;
	history?: H.History;
}
export interface DeletePairsRequest {
	pairsList: Array<PairDTO>;
}
export interface SavePairRequest {
	pair: PairDTO;
}
export interface SelectPairsRequest {
	tournamentId: number;
	stage1Name: string;
	stage1Rows: Array<Stage1Row>;
}
// Response
export interface FindAliasResponse extends GenericResponse {
	alias: string;
}
export interface FetchPairsResponse extends GenericResponse {
	pairsList: Array<PairDTO>;
}
export interface DeletePairsResponse extends GenericResponse {
	pairsList: Array<PairDTO>;
}
export interface SavePairResponse extends GenericResponse {
	pair: PairDTO;
}
export interface SelectPairsResponse extends GenericResponse {
	stage1Name: string;
	stage1Rows: Array<Stage1Row>;
}

export type PairError = GenericResponse

export const getEmptyPair = (label?: string, tournamentId = 0): PairDTO => ({
	id: null,
	tournamentId,
	rowNumber: 0,
	player1: getEmptyPlayer(),
	player2: getEmptyPlayer(),
	alias: label || '',
	stage1Name: '',
	placement: 0,
	paid1: false,
	paid2: false,
});
