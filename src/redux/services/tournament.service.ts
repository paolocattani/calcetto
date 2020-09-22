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
  getWrapper<FetchTournamentsRequest, FetchTournamentsResponse>(
    request?.tId ? `/api/v2/tournament/${request.tId}` : '/api/v2/tournament/list'
  );

export const postTournament = async ({ tournament }: SaveTournamentRequest): Promise<SaveTournamentResponse> =>
  postWrapper<SaveTournamentRequest, SaveTournamentResponse>('/api/v2/tournament/new', { tournament });

export const updateTournament = async ({ tournament }: UpdateTournamentRequest): Promise<UpdateTournamentResponse> =>
  putWrapper<UpdateTournamentRequest, UpdateTournamentResponse>('/api/v2/tournament/update', { tournament });
// TODO: add DELETE
