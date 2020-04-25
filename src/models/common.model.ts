import { PlayerState, TournamentState, PairState, SessionState } from 'models';

export interface RootState {
  tournamentState: TournamentState;
  pairState: PairState;
  playerState: PlayerState;
  sessionState: SessionState;
}
