import { PlayerState, TournamentState, PairState, SessionState, Stage1State, Stage2State } from 'redux/models';

export interface RootState {
  tournamentState: TournamentState;
  pairState: PairState;
  playerState: PlayerState;
  stage1State: Stage1State;
  stage2State: Stage2State;
  sessionState: SessionState;
}
