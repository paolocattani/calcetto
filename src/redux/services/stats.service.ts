import {
	StatsBestPairsResponse,
	StatsBestPlayersRequest,
	StatsBestPlayersResponse,
	StatsPairFromPlayerRequest,
	StatsPairRequest,
	StatsPairResponse,
	StatsPlayerRequest,
	StatsPlayerResponse,
	StatsSummaryResponse,
} from 'src/@common/models/stats.model';
import { getWrapper, postWrapper } from '../../@common/utils/fetch.utils';

export const fetchPlayerStats = (request: StatsPlayerRequest): Promise<StatsPlayerResponse> =>
	postWrapper<StatsPlayerRequest, StatsPlayerResponse>('/api/v2/stats/player', request);

export const fetchPairsFromPlayerStats = ({
	player1Id,
	player2Id,
}: StatsPairFromPlayerRequest): Promise<StatsPlayerResponse> =>
	getWrapper<StatsPlayerResponse>(`/api/v2/stats/pair?player1Id=${player1Id}&player2Id=${player2Id}`);

export const fetchPairStats = (request: StatsPairRequest): Promise<StatsPairResponse> =>
	postWrapper<StatsPairRequest, StatsPairResponse>('/api/v2/stats/pair', request);

export const fetchBestPlayers = ({ from }: StatsBestPlayersRequest): Promise<StatsBestPlayersResponse> =>
	getWrapper<StatsBestPlayersResponse>(`/api/v2/stats/player/bests${from ? `?from=${from}` : ''}`);
export const fetchBestPairs = ({ from }: StatsBestPlayersRequest): Promise<StatsBestPairsResponse> =>
	getWrapper<StatsBestPairsResponse>(`/api/v2/stats/pair/bests${from ? `?from=${from}` : ''}`);
export const fetchStatsSummary = (/*request: StatsSummaryRequest*/): Promise<StatsSummaryResponse> =>
	getWrapper<StatsSummaryResponse>('/api/v2/stats/summary');
