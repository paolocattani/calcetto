import {
  FetchTournamentsRequest,
  FetchTournamentsResponse,
  TournamentDTO,
  PostTournamentRequest,
  PostTournamentResponse,
  UpdateTournamentRequest,
  UpdateTournamentResponse,
} from '../models/tournament.model';

export const fetchTournaments = async (request: FetchTournamentsRequest): Promise<FetchTournamentsResponse> => {
  try {
    const response = await fetch(request?.tId ? `/api/v1/tournament/${request.tId}` : '/api/v1/tournament/list', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const results: TournamentDTO[] = await response.json();
    return { results };
  } catch (e) {
    handleError(e);
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
    handleError(e);
    return { result: null };
  }
};

export const updateTournament = async ({ model }: UpdateTournamentRequest): Promise<UpdateTournamentResponse> => {
  try {
    const response = await fetch('/api/v1/tournament', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(model),
    });
    const result: TournamentDTO = await response.json();
    return { result };
  } catch (e) {
    handleError(e);
    return { result: model };
  }
};

const handleError = (errorMessage: string): PostTournamentResponse => {
  console.warn('Failed to fetch tournaments', errorMessage);
  throw new Error('Something went wrong');
};
