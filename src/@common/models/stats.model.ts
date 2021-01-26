import { GenericReponse } from '.';
import { StatsPairDTO } from '../dto/stats/stats.pairs.dto';
import { StatsPlayerDTO } from '../dto/stats/stats.players.dto';

export interface StatsPlayerRequest {
	playerId: number;
}

export interface StatsPlayerResponse extends GenericReponse {
	statsPlayer?: StatsPlayerDTO;
}

export interface StatsPairFromPlayerRequest {
	player1Id: number;
	player2Id: number;
}

export interface StatsPairFromPlayerResponse extends GenericReponse {
	stats?: StatsPairDTO;
}

export interface StatsPairRequest {
	pairs: Array<number>;
}

export interface StatsPairResponse extends GenericReponse {
	stats: Map<number, StatsPairDTO>;
}

export interface StatsError extends GenericReponse {}
