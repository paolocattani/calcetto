import { RootState } from '@common/models';

// Get state from store
export const PairSelector = {
  isLoading: ({ pairState: { isLoading } }: RootState) => isLoading,
  getPairsList: ({ pairState: { pairsList } }: RootState) => pairsList,
};
