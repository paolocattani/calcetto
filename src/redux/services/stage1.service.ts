import {
	DeleteStage1Request,
	DeleteStage1Response,
	FetchStage1Request,
	FetchStage1Response,
	UpdateCellRequest,
	UpdateCellResponse,
	UpdatePlacementRequest,
	UpdatePlacementResponse,
} from '../../@common/models';
import { deleteWrapper, postWrapper, putWrapper } from '../../@common/utils/fetch.utils';

export const fetchStage1 = ({ pairsList, stageName }: FetchStage1Request) =>
	postWrapper<FetchStage1Request, FetchStage1Response>('/api/v2/stage1', {
		stageName,
		pairsList,
	});

export const updatePlacement = (request: UpdatePlacementRequest): Promise<UpdatePlacementResponse> =>
	putWrapper<UpdatePlacementRequest, UpdatePlacementResponse>('/api/v2/stage1/update/placement', request);

export const updateCellStage1 = (request: UpdateCellRequest): Promise<UpdateCellResponse> =>
	putWrapper<UpdateCellRequest, UpdateCellResponse>('/api/v2/stage1/update/cell', request);

export const deleteStage1 = (request: DeleteStage1Request): Promise<DeleteStage1Response> =>
	deleteWrapper<DeleteStage1Request, DeleteStage1Response>('/api/v2/stage1', request);
