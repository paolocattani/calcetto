import {
	StatsPairRequest,
	StatsPairResponse,
	StatsPlayerRequest,
	StatsPlayerResponse,
} from 'src/@common/models/stats.model';
import { getWrapper } from '../../@common/utils/fetch.utils';

export const fetchPlayerStats = ({ playerId }: StatsPlayerRequest) =>
	getWrapper<StatsPlayerResponse>(`/api/v2/stats/player/${playerId}`);

export const fetchPairStats = ({ player1Id, player2Id, pairId }: StatsPairRequest) =>
	getWrapper<StatsPairResponse>(
		`/api/v2/stats/pair?
	${player1Id ? `player1Id=${encodeURIComponent(player1Id)}` : ''}
	${player1Id && player2Id ? `&player2Id=${encodeURIComponent(player2Id)}` : ''}
	${pairId && !(player1Id && player2Id) ? `pairId=${encodeURIComponent(pairId)}` : ''}`
	);
