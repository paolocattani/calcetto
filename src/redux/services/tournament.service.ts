import {
  DeleteTournamentRequest,
  DeleteTournamentResponse,
  FetchTournamentsRequest,
  FetchTournamentsResponse,
  SaveTournamentRequest,
  SaveTournamentResponse,
  UpdateTournamentRequest,
  UpdateTournamentResponse,
} from '../../@common/models/tournament.model';
import { postWrapper, putWrapper, getWrapper, deleteWrapper } from '../../@common/utils/fetch.utils';

export const fetchTournaments = async (request: FetchTournamentsRequest): Promise<FetchTournamentsResponse> =>
  getWrapper<FetchTournamentsResponse>(
    request?.tId ? `/api/v2/tournament/${encodeURIComponent(request.tId)}` : '/api/v2/tournament/list'
  );

export const postTournament = async (request: SaveTournamentRequest): Promise<SaveTournamentResponse> =>
  postWrapper<SaveTournamentRequest, SaveTournamentResponse>('/api/v2/tournament/new', request);

export const updateTournament = async (request: UpdateTournamentRequest): Promise<UpdateTournamentResponse> =>
  putWrapper<UpdateTournamentRequest, UpdateTournamentResponse>('/api/v2/tournament/update', request);

export const deleteTournament = async (request: DeleteTournamentRequest): Promise<DeleteTournamentResponse> =>
  deleteWrapper<DeleteTournamentRequest, DeleteTournamentResponse>('/api/v2/tournament/delete', request);
