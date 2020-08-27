import { createReducer, Action } from 'typesafe-actions';
import { PlayerState } from 'redux/models/player.model';
import { PlayerAction } from 'redux/actions/player.action';

export const playerState: PlayerState = {
  isLoading: false,
  playersList: [],
};

export const PlayerReducer = createReducer<PlayerState, Action>(playerState)
  // Request
  .handleAction([PlayerAction.fetchPlayers.request, PlayerAction.savePlayer.request], (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  }))
  // Failure
  .handleAction(
    [PlayerAction.fetchPlayers.failure, PlayerAction.savePlayer.failure],
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
  .handleAction(PlayerAction.fetchPlayers.success, (state, { payload: { results } }) => ({
    playersList: results.map((e, i) => ({ ...e, rowNumber: i + 1 })),
    isLoading: false,
  }));
