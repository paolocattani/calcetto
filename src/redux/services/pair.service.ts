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
} from '@common/models';
import { deleteWrapper, getWrapper, postWrapper, putWrapper } from '../../@common/utils/fetch.utils';

export const fetchPairs = async ({ tId }: FetchPairsRequest): Promise<FetchPairsResponse> =>
  await getWrapper<FetchPairsResponse>(`/api/v1/pair/list?tId=${encodeURIComponent(tId)}`);
export const findAlias = async ({ player1Id, player2Id }: FindAliasRequest): Promise<FindAliasResponse> =>
  await getWrapper<FindAliasResponse>(
    `/api/v1/pair/alias?player1Id=${encodeURIComponent(player1Id)}&player2Id=${encodeURIComponent(player2Id)}`
  );
export const selectPairs = async (request: SelectPairsRequest): Promise<SelectPairsResponse> =>
  await putWrapper<SelectPairsRequest, SelectPairsResponse>('/api/v1/pair/selected', request);

export const postPair = async (request: SavePairRequest): Promise<SavePairResponse> =>
  await postWrapper<SavePairRequest, SavePairResponse>('/api/v1/pair/new', request);
export const updatePair = async (request: SavePairRequest): Promise<SavePairResponse> =>
  await putWrapper<SavePairRequest, SavePairResponse>('/api/v1/pair/new', request);

export const deletePairs = async (request: DeletePairsRequest): Promise<DeletePairsResponse> =>
  await deleteWrapper<DeletePairsRequest, DeletePairsResponse>('/api/v1/delete', request);
