import { createReducer, Action } from 'typesafe-actions';
import { PlayerState } from 'models/player.model';
import { PlayerAction } from 'actions/player.action';

const initialState: PlayerState = {
  isLoading: false,
  playersList: [],
};

export const PlayerReducer = createReducer<PlayerState, Action>(initialState)
  // Request
  .handleAction([PlayerAction.getPlayers.request, PlayerAction.savePlayer.request], (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  }))
  // Failure
  .handleAction(
    [PlayerAction.getPlayers.failure, PlayerAction.savePlayer.failure],
    (state, { payload: { message } }) => ({
      ...state,
      errorMessage: message,
      isLoading: false,
    })
  )
  .handleAction([PlayerAction.savePlayer.success], (state, { payload: { player } }) => ({
    playersList: [player, ...state.playersList],
    isLoading: false,
  }))
  .handleAction([PlayerAction.deletePlayers.success], (state, { payload: { players } }) => ({
    playersList: state.playersList.filter((row) => !players.find((selectedRow) => selectedRow.id === row.id)),
    isLoading: false,
  }))
  // Fetch Tournament
  .handleAction(PlayerAction.getPlayers.success, (state, { payload: { results } }) => ({
    playersList: results.map((e, i) => ({ ...e, rowNumber: i + 1 })),
    isLoading: false,
  }));
