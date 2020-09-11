import {
  FetchPlayersRequest,
  FetchPlayersResponse,
  PlayerRole,
  PlayerDTO,
  DeletePlayersRequest,
  DeletePlayersResponse,
  UpdatePlayerResponse,
  UpdatePlayerRequest,
} from 'redux/models';
import { handleError, DEFAULT_HEADERS } from './common';

export const fetchPlayers = async ({ tId, addEmpty }: FetchPlayersRequest): Promise<FetchPlayersResponse> => {
  try {
    const response = await fetch(tId ? `/api/v1/player/list/${tId}` : '/api/v1/player/list', {
      method: 'GET',
      ...DEFAULT_HEADERS,
    });
    const result = await response.json();
    return { results: addEmpty ? [...result, getEmptyPlayer('Nessun Giocatore')] : result };
  } catch (e) {
    handleError(e, 'Error players fetch');
    return { results: [] };
  }
};

export const deletePlayers = async ({ players }: DeletePlayersRequest): Promise<DeletePlayersResponse> => {
  try {
    const response = await fetch('/api/v1/player', {
      method: 'DELETE',
      ...DEFAULT_HEADERS,
      body: JSON.stringify(players),
    });
    await response.json();
    return { players: response.ok ? players : [] };
  } catch (e) {
    handleError(e, 'Error players delete');
    return { players: [] };
  }
};

export const savePlayer = async ({ player }: UpdatePlayerRequest): Promise<UpdatePlayerResponse> => {
  try {
    const response = await fetch('/api/v1/player', {
      method: 'POST',
      ...DEFAULT_HEADERS,
      body: JSON.stringify(player),
    });
    const result = await response.json();
    return { player: result };
  } catch (e) {
    handleError(e, 'Error players save');
    return { player };
  }
};

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
