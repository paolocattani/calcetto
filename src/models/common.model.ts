import { PlayerState, TournamentState } from 'models';

export interface RootState {
  tournamentState: TournamentState;
  playerState: PlayerState;
}
