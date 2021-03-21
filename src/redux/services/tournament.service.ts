import {
	DeleteTournamentRequest,
	DeleteTournamentResponse,
	FetchTournamentsResponse,
	ReloadTournamentRequest,
	ReloadTournamentResponse,
	SaveTournamentRequest,
	SaveTournamentResponse,
	UpdateTournamentRequest,
	UpdateTournamentResponse,
} from '../../@common/models/tournament.model';
import { postWrapper, putWrapper, getWrapper, deleteWrapper } from '../../@common/utils/fetch.utils';
import { OmitHistory } from '../../@common/models';

export const reloadTournament = (request: ReloadTournamentRequest): Promise<ReloadTournamentResponse> =>
	getWrapper<ReloadTournamentResponse>(`/api/v2/tournament/${encodeURIComponent(request.tId)}`);

export const fetchTournaments = (/*request: OmitHistory<FetchTournamentsRequest>*/): Promise<FetchTournamentsResponse> =>
	getWrapper<FetchTournamentsResponse>('/api/v2/tournament/list');

export const postTournament = (request: OmitHistory<SaveTournamentRequest>): Promise<SaveTournamentResponse> =>
	postWrapper<SaveTournamentRequest, SaveTournamentResponse>('/api/v2/tournament/new', request);

export const updateTournament = (request: UpdateTournamentRequest): Promise<UpdateTournamentResponse> =>
	putWrapper<UpdateTournamentRequest, UpdateTournamentResponse>('/api/v2/tournament/update', request);

export const deleteTournament = (request: DeleteTournamentRequest): Promise<DeleteTournamentResponse> =>
	deleteWrapper<DeleteTournamentRequest, DeleteTournamentResponse>('/api/v2/tournament/delete', request);
