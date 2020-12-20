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
import {DeleteUserRequest, OmitHistory} from '../../@common/models';

export const fetchTournaments = (request: OmitHistory<FetchTournamentsRequest>): Promise<FetchTournamentsResponse> =>
  getWrapper<FetchTournamentsResponse>(
    request?.tId ? `/api/v2/tournament/${encodeURIComponent(request.tId)}` : '/api/v2/tournament/list'
  );

export const postTournament = (request: OmitHistory<SaveTournamentRequest>) =>
  postWrapper<SaveTournamentRequest, SaveTournamentResponse>('/api/v2/tournament/new', request);

export const updateTournament = (request: UpdateTournamentRequest) =>
  putWrapper<UpdateTournamentRequest, UpdateTournamentResponse>('/api/v2/tournament/update', request);

export const deleteTournament = (request: DeleteTournamentRequest) =>
  deleteWrapper<DeleteTournamentRequest, DeleteTournamentResponse>('/api/v2/tournament/delete', request);
