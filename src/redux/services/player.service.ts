import { PlayerDTO, PlayerRole } from '@common/dto';
import {
  FetchPlayersRequest,
  FetchPlayersResponse,
  DeletePlayersRequest,
  DeletePlayersResponse,
  UpdatePlayerResponse,
  UpdatePlayerRequest,
} from '@common/models';
import { UserMessageType } from '@common/models/common.models';
import { HTTPStatusCode } from '@common/models/HttpStatusCode';
import { DEFAULT_HEADERS, deleteWrapper, postWrapper } from '../../@common/utils/fetch.utils';

export const fetchPlayers = async ({ tId, addEmpty }: FetchPlayersRequest): Promise<FetchPlayersResponse> => {
  try {
    const response = await fetch(tId ? `/api/v2/player/list/${tId}` : '/api/v2/player/list', {
      method: 'GET',
      ...DEFAULT_HEADERS,
    });
    const result: FetchPlayersResponse = await response.json();
    return {
      ...result,
      playersList: addEmpty ? [...result.playersList, getEmptyPlayer('Nessun Giocatore')] : result.playersList,
    };
  } catch (e) {
    return {
      code: HTTPStatusCode.InternalServerError,
      message: '',
      userMessage: { type: UserMessageType.Danger, message: 'Errore server non previsto' },
      playersList: [],
    };
  }
};

export const deletePlayers = async ({ players }: DeletePlayersRequest): Promise<DeletePlayersResponse> =>
  deleteWrapper<DeletePlayersRequest, DeletePlayersResponse>('/api/v2/player', { players });

export const savePlayer = async ({ player }: UpdatePlayerRequest): Promise<UpdatePlayerResponse> =>
  postWrapper<UpdatePlayerRequest, UpdatePlayerResponse>('/api/v2/player', { player });

export const getEmptyPlayer = (label?: string): PlayerDTO => ({
  id: null,
  name: '',
  surname: '',
  alias: '',
  label: label || '',
  role: PlayerRole.GoalKeeper,
  email: '',
  phone: '',
  match_played: 0,
  match_won: 0,
  total_score: 0,
  editable: false,
  rowNumber: 0,
});
