import { GenericReponse } from '.';
import { StatsPairDTO } from '../dto/stats/stats.pairs.dto';
import { StatsPlayerDTO } from '../dto/stats/stats.players.dto';

//## STATE
export interface StatsState {
	players?: Array<StatsPlayerDTO>;
	pairs?: Array<StatsPairDTO>;
	isLoading: boolean;
}

export interface StatsPairMap {
	[key: string]: StatsPairDTO;
}

export interface StatsPlayerMap {
	[key: string]: StatsPlayerDTO;
}

// Request
export interface StatsSummaryRequest {}
export interface StatsBestPlayersRequest {
	from?: string;
}
export interface StatsBestPairsRequest {
	from?: string;
}
export interface StatsPlayerRequest {
	players: Array<number>;
}
export interface StatsPairRequest {
	pairs: Array<number>;
}
export interface StatsPairFromPlayerRequest {
	player1Id: number;
	player2Id: number;
}

// Response
export interface StatsSummaryResponse extends GenericReponse {
	pairs: {
		ever: Array<StatsPairDTO>;
		month: Array<StatsPairDTO>;
		week: Array<StatsPairDTO>;
	};
	players: {
		ever: Array<StatsPlayerDTO>;
		month: Array<StatsPlayerDTO>;
		week: Array<StatsPlayerDTO>;
	};
}
export interface StatsBestPlayersResponse extends GenericReponse {
	stats: Array<StatsPlayerDTO>;
}
export interface StatsBestPairsResponse extends GenericReponse {
	stats: Array<StatsPairDTO>;
}
export interface StatsPlayerResponse extends GenericReponse {
	stats: StatsPlayerMap;
}
export interface StatsPairResponse extends GenericReponse {
	stats: StatsPairMap;
}
export interface StatsPairFromPlayerResponse extends GenericReponse {
	stats: StatsPairDTO;
}

// Error
export interface StatsError extends GenericReponse {}
