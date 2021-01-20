import {
	FetchPairsRequest,
	FetchPairsResponse,
	SavePairResponse,
	SavePairRequest,
	DeletePairsRequest,
	DeletePairsResponse,
	FindAliasRequest,
	FindAliasResponse,
	SelectPairsResponse,
	SelectPairsRequest,
} from '../../@common/models';
import { deleteWrapper, getWrapper, postWrapper, putWrapper } from '../../@common/utils/fetch.utils';

const API_VERSION = '/api/v2/pair';
const listAPI = (tId: number) => `${API_VERSION}/list?tId=${encodeURIComponent(tId)}`;
const aliasAPI = (player1Id: number, player2Id: number) =>
	`${API_VERSION}/alias?player1Id=${encodeURIComponent(player1Id)}&player2Id=${encodeURIComponent(player2Id)}`;
const selectAPI = () => `${API_VERSION}/selected`;
const newAPI = () => `${API_VERSION}/new`;
const deleteAPI = () => `${API_VERSION}/delete`;

export const fetchPairs = ({ tId }: FetchPairsRequest) => getWrapper<FetchPairsResponse>(listAPI(tId));
export const findAlias = ({ player1Id, player2Id }: FindAliasRequest) =>
	getWrapper<FindAliasResponse>(aliasAPI(player1Id, player2Id));
export const selectPairs = (request: SelectPairsRequest) =>
	putWrapper<SelectPairsRequest, SelectPairsResponse>(selectAPI(), request);
export const postPair = (request: SavePairRequest) => postWrapper<SavePairRequest, SavePairResponse>(newAPI(), request);

// FIXME: create update
export const updatePair = (request: SavePairRequest) =>
	postWrapper<SavePairRequest, SavePairResponse>(newAPI(), request);
export const deletePairs = (request: DeletePairsRequest) =>
	deleteWrapper<DeletePairsRequest, DeletePairsResponse>(deleteAPI(), request);
