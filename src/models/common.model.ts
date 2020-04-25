import { PlayerState, TournamentState, PairState } from 'models';

export interface RootState {
  tournamentState: TournamentState;
  pairState: PairState;
  playerState: PlayerState;
}
