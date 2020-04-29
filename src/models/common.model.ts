import { PlayerState, TournamentState, PairState, SessionState, Stage1State } from 'models';

export interface RootState {
  tournamentState: TournamentState;
  pairState: PairState;
  playerState: PlayerState;
  stage1State: Stage1State;
  sessionState: SessionState;
}
