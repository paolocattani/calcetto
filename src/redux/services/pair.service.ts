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

export const fetchPairs = ({ tId }: FetchPairsRequest): Promise<FetchPairsResponse> =>
	getWrapper<FetchPairsResponse>(`/api/v2/pair/list?tId=${encodeURIComponent(tId)}`);
export const findAlias = ({ player1Id, player2Id }: FindAliasRequest): Promise<FindAliasResponse> =>
	getWrapper<FindAliasResponse>(
		`/api/v2/pair/alias?player1Id=${encodeURIComponent(player1Id)}&player2Id=${encodeURIComponent(player2Id)}`
	);
export const selectPairs = (request: SelectPairsRequest): Promise<SelectPairsResponse> =>
	putWrapper<SelectPairsRequest, SelectPairsResponse>('/api/v2/pair/selected', request);
export const postPair = (request: SavePairRequest): Promise<SavePairResponse> =>
	postWrapper<SavePairRequest, SavePairResponse>('/api/v2/pair/new', request);

// FIXME: create update
export const updatePair = (request: SavePairRequest): Promise<SavePairResponse> =>
	postWrapper<SavePairRequest, SavePairResponse>('/api/v2/pair/new', request);
export const deletePairs = (request: DeletePairsRequest): Promise<DeletePairsResponse> =>
	deleteWrapper<DeletePairsRequest, DeletePairsResponse>('/api/v2/pair/delete', request);
