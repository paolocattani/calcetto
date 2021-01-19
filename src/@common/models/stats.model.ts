import { GenericReponse } from '.';
import { StatsPairDTO } from '../dto/stats/stats.pairs.dto';
import { StatsPlayerDTO } from '../dto/stats/stats.players.dto';

export interface StatsPlayerRequest {
	playerId: number;
}

export interface StatsPlayerResponse extends GenericReponse {
	statsPlayer: StatsPlayerDTO;
}

export interface StatsPairRequest1 {
	pairId: number;
}
export interface StatsPairRequest2 {
	player1Id: number;
	player2Id: number;
}

export interface StatsPairResponse extends GenericReponse {
	statsPair: StatsPairDTO;
}

export interface StatsError extends GenericReponse {}
