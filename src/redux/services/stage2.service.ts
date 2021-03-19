import {
	FetchStage2Response,
	FetchStage2Request,
	DeleteStage2Request,
	DeleteStage2Response,
	UpdateStage2CellRequest,
	UpdateStage2CellResponse,
	FetchStage2PairsResponse,
	FetchStage2PairsRequest,
	getEmptyPair,
} from '../../@common/models';
import { deleteWrapper, getWrapper, postWrapper } from '../../@common/utils/fetch.utils';

export const deleteStage2 = (request: DeleteStage2Request): Promise<DeleteStage2Response> =>
	deleteWrapper<DeleteStage2Request, DeleteStage2Response>('/api/v2/stage2', request);

export const updateCells = (request: UpdateStage2CellRequest): Promise<UpdateStage2CellResponse> =>
	postWrapper<UpdateStage2CellRequest, UpdateStage2CellResponse>('/api/v2/stage2/cells', request);

export const fetchPairsStage2 = ({ tournamentId }: FetchStage2PairsRequest): Promise<FetchStage2PairsResponse> => {
	const afterFetch = (response: FetchStage2PairsResponse) => ({
		...response,
		pairs: [getEmptyPair('-', tournamentId), ...response.pairs],
	});
	return getWrapper<FetchStage2PairsResponse>(`/api/v2/stage2/pairs/${tournamentId}`, afterFetch);
};

export const fetchStage2 = (request: FetchStage2Request): Promise<FetchStage2Response> =>
	postWrapper<FetchStage2Request, FetchStage2Response>('/api/v2/stage2', request);
