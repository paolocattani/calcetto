import { RootState, Stage1Row, PairDTO } from 'models';

// Get state from store
export const Stage1Selector = {
  isLoading({ stage1State: { isLoading } }: RootState): boolean {
    return isLoading;
  },
  // Get pairs List
  getSelectedRows({ stage1State: { selectedRows } }: RootState): Map<string, Stage1Row[]> | null {
    return selectedRows || null;
  },
  getSelectedPairs({ stage1State: { selectedPairs } }: RootState): PairDTO[] {
    return selectedPairs;
  },
  getNeedRefresh({ stage1State: { needRefresh } }: RootState): boolean {
    return needRefresh;
  },
};
