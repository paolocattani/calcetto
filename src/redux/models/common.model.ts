import { PlayerState, TournamentState, PairState, SessionState, Stage1State, Stage2State } from 'redux/models';
import { HTTPStatusCode } from '@common/models/HttpStatusCode';

export interface RootState {
  tournamentState: TournamentState;
  pairState: PairState;
  playerState: PlayerState;
  stage1State: Stage1State;
  stage2State: Stage2State;
  sessionState: SessionState;
}

export enum UserMessageType {
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
}
export interface UserMessage {
  type: UserMessageType;
  message: string;
}

export interface GenericReponse {
  code: HTTPStatusCode;
  message: string;
  userMessage: UserMessage;
}
