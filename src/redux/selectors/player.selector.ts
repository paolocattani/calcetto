import { RootState } from '@common/models';

// Get state from store
export const PlayerSelector = {
  // Default states
  isLoading: ({ playerState: { isLoading } }: RootState) => isLoading,
  isSaving: ({ playerState: { isSaving } }: RootState) => isSaving,
  // Player
  getPlayersList: ({ playerState: { playersList } }: RootState) => playersList,
  getPlayer: ({ playerState: { player } }: RootState) => player,
};
