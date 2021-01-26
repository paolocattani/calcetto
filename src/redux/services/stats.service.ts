import {
	StatsPairFromPlayerRequest,
	StatsPairRequest,
	StatsPairResponse,
	StatsPlayerRequest,
	StatsPlayerResponse,
} from 'src/@common/models/stats.model';
import { getWrapper, postWrapper } from '../../@common/utils/fetch.utils';

export const fetchPlayerStats = ({ playerId }: StatsPlayerRequest) =>
	getWrapper<StatsPlayerResponse>(`/api/v2/stats/player/${playerId}`);

export const fetchPairsFromPlayerStats = ({ player1Id, player2Id }: StatsPairFromPlayerRequest) =>
	getWrapper<StatsPlayerResponse>(`/api/v2/stats/pair?player1Id=${player1Id}&player2Id=${player2Id}`);

export const fetchPairStats = (request: StatsPairRequest) =>
	postWrapper<StatsPairRequest, StatsPairResponse>('/api/v2/stats/pair', request);
