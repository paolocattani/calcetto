import { RootState } from 'redux/models';

// Get state from store
export const PlayerSelector = {
  isLoading: ({ playerState: { isLoading } }: RootState) => isLoading,
  isSaving: ({ playerState: { isSaving } }: RootState) => isSaving,
  getPlayersList: ({ playerState: { playersList } }: RootState) => playersList,
};
