import { PairDTO } from '../../@common/dto';
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
import { getEmptyPlayer } from './player.service';

const API_VERSION = '/api/v2/pair';
const listAPI = (tId: number) => `${API_VERSION}/list?tId=${encodeURIComponent(tId)}`;
const aliasAPI = (player1Id: number, player2Id: number) =>
  `${API_VERSION}/alias?player1Id=${encodeURIComponent(player1Id)}&player2Id=${encodeURIComponent(player2Id)}`;
const selectAPI = () => `${API_VERSION}/selected`;
const newAPI = () => `${API_VERSION}/new`;
const deleteAPI = () => `${API_VERSION}/delete`;

export const fetchPairs = async ({ tId }: FetchPairsRequest) => getWrapper<FetchPairsResponse>(listAPI(tId));
export const findAlias = async ({ player1Id, player2Id }: FindAliasRequest) => getWrapper<FindAliasResponse>(aliasAPI(player1Id, player2Id));
export const selectPairs = async (request: SelectPairsRequest) => putWrapper<SelectPairsRequest, SelectPairsResponse>(selectAPI(), request);
export const postPair = async (request: SavePairRequest) => postWrapper<SavePairRequest, SavePairResponse>(newAPI(), request);

// FIXME: create update
export const updatePair = async (request: SavePairRequest) => postWrapper<SavePairRequest, SavePairResponse>(newAPI(), request);
export const deletePairs = async (request: DeletePairsRequest) => deleteWrapper<DeletePairsRequest, DeletePairsResponse>(deleteAPI(), request);

export const getEmptyPair = (label?: string): PairDTO => ({
  id: null,
  tournamentId: 0,
  rowNumber: 0,
  player1: getEmptyPlayer(),
  player2: getEmptyPlayer(),
  alias: label || '',
  stage1Name: '',
  placement: 0,
  paid1: false,
  paid2: false,
});
