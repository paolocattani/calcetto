import { TournamentDTO } from '@common/dto';
import {
  FetchTournamentsRequest,
  FetchTournamentsResponse,
  SaveTournamentRequest,
  SaveTournamentResponse,
  UpdateTournamentRequest,
  UpdateTournamentResponse,
} from '../models/tournament.model';
import { handleError, UnexpectedServerError, DEFAULT_HEADERS } from './common';

export const fetchTournaments = async (request: FetchTournamentsRequest): Promise<FetchTournamentsResponse> => {
  try {
    const response = await fetch(request?.tId ? `/api/v1/tournament/${request.tId}` : '/api/v1/tournament/list', {
      method: 'GET',
      ...DEFAULT_HEADERS,
    });
    const results: TournamentDTO[] = await response.json();
    return { results };
  } catch (e) {
    handleError(e, 'Error fetching Tournaments');
    return { results: [] };
  }
};

export const postTournament = async ({ model }: SaveTournamentRequest): Promise<SaveTournamentResponse> => {
  try {
    const response = await fetch('/api/v1/tournament', {
      method: 'POST',
      ...DEFAULT_HEADERS,
      body: JSON.stringify(model),
    });
    return await response.json();
  } catch (e) {
    return {
      tournament: null,
      ...UnexpectedServerError,
    };
  }
};

export const updateTournament = async ({ model }: UpdateTournamentRequest): Promise<UpdateTournamentResponse> => {
  try {
    const response = await fetch('/api/v1/tournament', {
      method: 'PUT',
      ...DEFAULT_HEADERS,
      body: JSON.stringify(model),
    });
    return await response.json();
  } catch (e) {
    return { tournament: model, ...UnexpectedServerError };
  }
};
