import { PairDTO, RootState } from 'models';

// Get state from store
export const PairSelector = {
  isLoading({ pairState: { isLoading } }: RootState): boolean {
    return isLoading;
  },
  // Get pairs List
  getPairsList({ pairState: { pairList } }: RootState): PairDTO[] | undefined {
    return pairList;
  },
};
