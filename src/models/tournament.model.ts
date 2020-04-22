// Requests
export interface FetchTournamentsRequest {
  tId?: number;
}
export interface PostTournamentRequest {
  model: TournamentDTO;
}

// Responses
export interface FetchTournamentsResponse {
  results: TournamentDTO[];
}
export interface PostTournamentResponse {
  result: TournamentDTO | null;
}
//
export interface TournamentState {
  tournament: TournamentDTO | null;
  tournamentsList: TournamentDTO[] | [];
  isLoading: boolean;
}

export interface TournamentDTO {
  id: number | null;
  name: string;
  date: Date;
  progress: ITournamentProgress;
  public: boolean;
  label: string;
  ownerId: number | null;
}

export type ITournamentProgress = 'New' | 'PairsSelection' | 'Stage1' | 'Stage2';

export enum TournamentProgress {
  New = 'New',
  PairsSelection = 'PairsSelection',
  Stage1 = 'Stage1',
  Stage2 = 'Stage2',
}
