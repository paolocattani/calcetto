import {
	FetchPlayersRequest,
	FetchPlayersResponse,
	DeletePlayersRequest,
	DeletePlayersResponse,
	SavePlayerResponse,
	SavePlayerRequest,
	getEmptyPlayer,
} from '../../@common/models';
import { UnexpectedServerError } from '../../@common/models/common.models';
import { default_headers, deleteWrapper, postWrapper, putWrapper } from '../../@common/utils/fetch.utils';

export const fetchPlayers = async ({ tId, addEmpty }: FetchPlayersRequest): Promise<FetchPlayersResponse> => {
	try {
		const response = await fetch(tId ? `/api/v2/player/list/${encodeURIComponent(tId)}` : '/api/v2/player/list', {
			method: 'GET',
			headers: default_headers,
		});
		const result: FetchPlayersResponse = await response.json();
		return {
			...result,
			playersList: addEmpty ? [...result.playersList, getEmptyPlayer('Nessun Giocatore')] : result.playersList,
		};
	} catch (e) {
		return { ...UnexpectedServerError, playersList: [] };
	}
};

export const deletePlayers = async (request: DeletePlayersRequest) =>
	deleteWrapper<DeletePlayersRequest, DeletePlayersResponse>('/api/v2/player/delete', request);

export const savePlayer = async (request: SavePlayerRequest) =>
	postWrapper<SavePlayerRequest, SavePlayerResponse>('/api/v2/player/new', request);

export const updatePlayer = async (request: SavePlayerRequest) =>
	putWrapper<SavePlayerRequest, SavePlayerResponse>('/api/v2/player/update', request);
