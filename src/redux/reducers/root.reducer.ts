import { createReducer } from 'typesafe-actions';
import { RootState } from 'redux/models';
import { Action } from 'redux';
import { tournamentState } from './tournament.reducer';
import { pairState } from './pair.reducer';
import { playerState } from './player.reducer';
import { stage1State } from './stage1.reducer';
import { stage2State } from './stage2.reducer';
import { sessionState } from './session.reducer';
import { RootAction } from 'redux/actions/root.action';

const initialState: RootState = {
  tournamentState: tournamentState,
  pairState: pairState,
  playerState: playerState,
  stage1State: stage1State,
  stage2State: stage2State,
  sessionState: sessionState,
};

export const RootReducer = createReducer<RootState, Action>(initialState).handleAction(
  [RootAction.logout],
  () => initialState
);
