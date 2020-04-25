import { RootState, PlayerDTO } from 'models';

// Get state from store
export const PlayerSelector = {
  isLoading({ pairState: { isLoading } }: RootState): boolean {
    return isLoading;
  },
  // Get pairs List
  getPlayerList({ playerState: { playerList } }: RootState): PlayerDTO[] | undefined {
    return playerList;
  },
};
