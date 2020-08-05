import { RootState } from 'redux/models';

// Get state from store
export const PlayerSelector = {
  isLoading: ({ pairState: { isLoading } }: RootState) => isLoading,
  getPlayersList: ({ playerState: { playersList } }: RootState) => playersList,
};
