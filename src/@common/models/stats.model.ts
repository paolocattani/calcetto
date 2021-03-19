import { GenericResponse } from '.';
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
// eslint-disable-next-line @typescript-eslint/no-empty-interface
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
export interface StatsSummaryResponse extends GenericResponse {
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
export interface StatsBestPlayersResponse extends GenericResponse {
	stats: Array<StatsPlayerDTO>;
}
export interface StatsBestPairsResponse extends GenericResponse {
	stats: Array<StatsPairDTO>;
}
export interface StatsPlayerResponse extends GenericResponse {
	stats: StatsPlayerMap;
}
export interface StatsPairResponse extends GenericResponse {
	stats: StatsPairMap;
}
export interface StatsPairFromPlayerResponse extends GenericResponse {
	stats: StatsPairDTO;
}

// Error
export type StatsError = GenericResponse;
