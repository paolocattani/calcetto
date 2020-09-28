import { createReducer, Action } from 'typesafe-actions';
import { PlayerState } from '@common/models/player.model';
import { PlayerAction } from 'redux/actions/player.action';

export const initialPlayerState: PlayerState = {
  isLoading: false,
  isSaving: false,
  playersList: [],
};

export const PlayerReducer = createReducer<PlayerState, Action>(initialPlayerState)
  // Request
  .handleAction([PlayerAction.fetchPlayers.request], (state) => ({
    ...state,
    isLoading: true,
  }))
  .handleAction(
    [PlayerAction.savePlayer.request, PlayerAction.updatePlayer.request, PlayerAction.deletePlayers.request],
    (state) => ({
      ...state,
      isLoading: true,
      isSaving: true,
    })
  )
  // Failure
  .handleAction(
    [
      PlayerAction.fetchPlayers.failure,
      PlayerAction.savePlayer.failure,
      PlayerAction.updatePlayer.failure,
      PlayerAction.deletePlayers.failure,
    ],
    (state, { payload: { message } }) => ({
      ...state,
      isLoading: false,
    })
  )
  // Success
  .handleAction([PlayerAction.savePlayer.success], (state, { payload: { player } }) => ({
    playersList: [player, ...state.playersList],
    isLoading: false,
    isSaving: false,
  }))
  .handleAction([PlayerAction.deletePlayers.success], (state, { payload: { playersList } }) => ({
    playersList: state.playersList.filter((row) => !playersList.find((selectedRow) => selectedRow.id === row.id)),
    isLoading: false,
    isSaving: false,
  }))
  .handleAction(PlayerAction.fetchPlayers.success, (state, { payload: { playersList } }) => ({
    playersList: playersList.map((e, i) => ({ ...e, rowNumber: i + 1 })),
    isLoading: false,
    isSaving: false,
  }))
  .handleAction(PlayerAction.setPlayer, (state, { payload }) => ({ ...state, player: payload }))
  .handleAction(PlayerAction.purge, () => initialPlayerState);
