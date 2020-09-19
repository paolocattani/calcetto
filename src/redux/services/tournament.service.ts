import {
  FetchTournamentsRequest,
  FetchTournamentsResponse,
  SaveTournamentRequest,
  SaveTournamentResponse,
  UpdateTournamentRequest,
  UpdateTournamentResponse,
} from '../../@common/models/tournament.model';
import { postWrapper, putWrapper, getWrapper } from '../../@common/utils/fetch.utils';

export const fetchTournaments = async (request: FetchTournamentsRequest): Promise<FetchTournamentsResponse> =>
  getWrapper<FetchTournamentsResponse>(request?.tId ? `/api/v1/tournament/${request.tId}` : '/api/v1/tournament/list');

export const postTournament = async ({ model }: SaveTournamentRequest): Promise<SaveTournamentResponse> =>
  postWrapper<SaveTournamentResponse>('/api/v1/tournament', model);

export const updateTournament = async ({ model }: UpdateTournamentRequest): Promise<UpdateTournamentResponse> =>
  putWrapper<UpdateTournamentResponse>('/api/v1/tournament', model);
