import { PlayerRole } from '../dto';
import { RootState } from '.';
import { HTTPStatusCode } from './HttpStatusCode';

export interface GenericReponse {
  code: HTTPStatusCode;
  message: string;
  userMessage: UserMessage;
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

export type OmitHistory<T> = Omit<T, 'history'>;
// FIXME:
export type OmitGeneric<T extends GenericReponse> = Omit<T, 'code' | 'message' | 'userMessage'>;
// FIXME: UNUSED
export type PickGeneric<T extends GenericReponse> = Pick<T, 'code' | 'message' | 'userMessage'>;

export const UnexpectedServerError: GenericReponse = {
  code: HTTPStatusCode.InternalServerError,
  message: 'Unexpected Server Error',
  userMessage: {
    type: UserMessageType.Danger,
    // eslint-disable-next-line quotes
    message: "Errore server non previsto. E' stata avviata la procedura di autodistruzione.",
  },
};

export const initialState: RootState = {
  tournamentState: {
    tournament: null,
    tournamentsList: [],
    isLoading: false,
  },
  playerState: {
    isLoading: false,
    playersList: [],
    isSaving: false,
  },
  pairState: {
    isLoading: false,
    isSaving: false,
  },
  authState: {
    isAuthenticated: false,
    isAdmin: false,
    isLoading: false,
  },
  stage1State: {
    needRefresh: false,
    selectedPairs: [
      {
        id: null,
        tournamentId: 0,
        rowNumber: 0,
        player1: {
          id: null,
          name: '',
          surname: '',
          alias: '',
          label: '',
          role: PlayerRole.GoalKeeper,
          email: '',
          phone: '',
          match_played: 0,
          match_won: 0,
          total_score: 0,
          editable: false,
          rowNumber: 0,
        },
        player2: {
          id: null,
          name: '',
          surname: '',
          alias: '',
          label: '',
          role: PlayerRole.GoalKeeper,
          email: '',
          phone: '',
          match_played: 0,
          match_won: 0,
          total_score: 0,
          editable: false,
          rowNumber: 0,
        },
        alias: '-',
        stage1Name: '',
        placement: 0,
        paid1: false,
        paid2: false,
      },
    ],
    isLoading: false,
    stages: [],
  },
  stage2State: {
    isLoading: false,
  },
};
