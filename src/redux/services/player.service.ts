import { PlayerDTO, PlayerRole } from '@common/dto';
import {
  FetchPlayersRequest,
  FetchPlayersResponse,
  DeletePlayersRequest,
  DeletePlayersResponse,
  SavePlayerResponse,
  SavePlayerRequest,
} from '@common/models';
import { UnexpectedServerError } from '@common/models/common.models';
import { DEFAULT_HEADERS, deleteWrapper, postWrapper, putWrapper } from '../../@common/utils/fetch.utils';

export const fetchPlayers = async ({ tId, addEmpty }: FetchPlayersRequest): Promise<FetchPlayersResponse> => {
  try {
    const response = await fetch(tId ? `/api/v2/player/list/${encodeURIComponent(tId)}` : '/api/v2/player/list', {
      method: 'GET',
      ...DEFAULT_HEADERS,
    });
    const result: FetchPlayersResponse = await response.json();
    return {
      ...result,
      playersList: addEmpty ? [...result.playersList, getEmptyPlayer('Nessun Giocatore')] : result.playersList,
    };
  } catch (e) {
    return { ...UnexpectedServerError, playersList: [] };
  }
};

export const deletePlayers = async ({ players }: DeletePlayersRequest): Promise<DeletePlayersResponse> =>
  deleteWrapper<DeletePlayersRequest, DeletePlayersResponse>('/api/v2/player/delete', { players });

export const savePlayer = async ({ player }: SavePlayerRequest): Promise<SavePlayerResponse> =>
  postWrapper<SavePlayerRequest, SavePlayerResponse>('/api/v2/player/new', { player });

export const updatePlayer = async ({ player }: SavePlayerRequest): Promise<SavePlayerResponse> =>
  putWrapper<SavePlayerRequest, SavePlayerResponse>('/api/v2/player/update', { player });

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
