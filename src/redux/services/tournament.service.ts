import {
  FetchTournamentsRequest,
  FetchTournamentsResponse,
  TournamentDTO,
  SaveTournamentRequest,
  SaveTournamentResponse,
  UpdateTournamentRequest,
  UpdateTournamentResponse,
} from '../models/tournament.model';
import { handleError, UnexpectedServerError } from './common';

export const fetchTournaments = async (request: FetchTournamentsRequest): Promise<FetchTournamentsResponse> => {
  try {
    const response = await fetch(request?.tId ? `/api/v1/tournament/${request.tId}` : '/api/v1/tournament/list', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(model),
    });
    const result: SaveTournamentResponse = await response.json();
    return result;
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(model),
    });
    const result: UpdateTournamentResponse = await response.json();
    return result;
  } catch (e) {
    return { tournament: model, ...UnexpectedServerError };
  }
};
