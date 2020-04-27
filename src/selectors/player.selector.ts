import { RootState } from 'models';

// Get state from store
export const PlayerSelector = {
  isLoading({ pairState: { isLoading } }: RootState) {
    return isLoading;
  },
  // Get pairs List
  getPlayerList({ playerState: { playerList } }: RootState) {
    return playerList;
  },
};
