import { createReducer, Action } from 'typesafe-actions';
import { PlayerState } from 'models/player.model';
import { PlayerAction } from 'actions/player.action';

const initialState: PlayerState = {
  isLoading: false,
};

export const PlayerReducer = createReducer<PlayerState, Action>(initialState)
  // Request
  .handleAction([PlayerAction.getPlayers.request], (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  }))
  // Failure
  .handleAction([PlayerAction.getPlayers.failure], (state, { payload: { message } }) => ({
    ...state,
    errorMessage: message,
    isLoading: false,
  }))
  // Fetch Tournament
  .handleAction(PlayerAction.getPlayers.success, (state, { payload: { results } }) => {
    console.log('PlayerAction.getPlayers.success ', results);

    return {
      ...state,
      playersList: results,
      isLoading: false,
    };
  });
