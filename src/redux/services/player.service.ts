import {
	FetchPlayersRequest,
	FetchPlayersResponse,
	DeletePlayersRequest,
	DeletePlayersResponse,
	SavePlayerResponse,
	SavePlayerRequest,
	getEmptyPlayer,
} from '../../@common/models';
import { deleteWrapper, getWrapper, postWrapper, putWrapper } from '../../@common/utils/fetch.utils';

export const fetchPlayers = ({ tId, addEmpty }: FetchPlayersRequest): Promise<FetchPlayersResponse> =>
	getWrapper<FetchPlayersResponse>(
		tId ? `/api/v2/player/list/${encodeURIComponent(tId)}` : '/api/v2/player/list',
		(response: FetchPlayersResponse) => ({
			...response,
			playersList: addEmpty ? [...response.playersList, getEmptyPlayer('Nessun Giocatore')] : response.playersList,
		})
	);

export const deletePlayers = (request: DeletePlayersRequest): Promise<DeletePlayersResponse> =>
	deleteWrapper<DeletePlayersRequest, DeletePlayersResponse>('/api/v2/player/delete', request);

export const savePlayer = (request: SavePlayerRequest): Promise<SavePlayerResponse> =>
	postWrapper<SavePlayerRequest, SavePlayerResponse>('/api/v2/player/new', request);

export const updatePlayer = (request: SavePlayerRequest): Promise<SavePlayerResponse> =>
	putWrapper<SavePlayerRequest, SavePlayerResponse>('/api/v2/player/update', request);
