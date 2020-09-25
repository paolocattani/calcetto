import { PlayerState, TournamentState, PairState, AuthState, Stage1State, Stage2State } from './';

export interface RootState {
  tournamentState: TournamentState;
  pairState: PairState;
  playerState: PlayerState;
  stage1State: Stage1State;
  stage2State: Stage2State;
  authState: AuthState;
}
