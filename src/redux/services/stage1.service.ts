import {
	FetchStage1Request,
	FetchStage1Response,
	UpdateCellRequest,
	UpdateCellResponse,
	UpdatePlacementRequest,
	UpdatePlacementResponse,
} from '../../@common/models';
import { rowsGenerator } from '../../components/Stage1/helper';
import { postWrapper, putWrapper } from '../../@common/utils/fetch.utils';

export const fetchStage1 = ({ pairsList, stageName }: FetchStage1Request) =>
	postWrapper<FetchStage1Request, FetchStage1Response>('/api/v1/stage1', {
		// FIXME:
		rows: rowsGenerator(pairsList),
		stageName,
		pairsList,
	});

export const updatePlacement = (request: UpdatePlacementRequest): Promise<UpdatePlacementResponse> =>
	putWrapper<UpdatePlacementRequest, UpdatePlacementResponse>('/api/v1/stage1/update/placement', request);

export const updateCellStage1 = (request: UpdateCellRequest): Promise<UpdateCellResponse> =>
	putWrapper<UpdateCellRequest, UpdateCellResponse>('/api/v1/stage1/update/cell', request);
