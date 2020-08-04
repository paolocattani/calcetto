import {
  FetchTournamentsRequest,
  FetchTournamentsResponse,
  TournamentDTO,
  PostTournamentRequest,
  PostTournamentResponse,
  UpdateTournamentRequest,
  UpdateTournamentResponse,
  IsValidTournamentRequest,
  IsValidTournamentResponse,
} from '../models/tournament.model';
import { handleError } from './common';

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

export const postTournament = async ({ model }: PostTournamentRequest): Promise<PostTournamentResponse> => {
  try {
    const response = await fetch('/api/v1/tournament', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(model),
    });
    const result: TournamentDTO = await response.json();
    console.log('postTournament : ', result);

    return { result };
  } catch (e) {
    handleError(e, 'Error updating Tournament');
    return { result: null };
  }
};

export const updateTournament = async ({ model }: UpdateTournamentRequest): Promise<UpdateTournamentResponse> => {
  try {
    const response = await fetch('/api/v1/tournament', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(model),
    });
    const result: TournamentDTO = await response.json();
    return { result };
  } catch (e) {
    handleError(e, 'Error updating Tournament');
    return { result: model };
  }
};

export const isValidTournament = async ({ model }: IsValidTournamentRequest): Promise<IsValidTournamentResponse> => {
  try {
    const response = await fetch('/api/v1/tournament/isValid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(model),
    });
    const { isValid }: IsValidTournamentResponse = await response.json();
    return { isValid };
  } catch (e) {
    handleError(e, 'Error validating Tournament');
    return { isValid: false };
  }
};
