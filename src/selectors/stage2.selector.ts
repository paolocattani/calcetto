import { RootState, Stage1Row, PairDTO, ICell } from 'models';

// Get state from store
export const Stage2Selector = {
  isLoading({ stage2State: { isLoading } }: RootState): boolean {
    return isLoading;
  },
  getCells({ stage2State: { cells } }: RootState): ICell[][] | undefined {
    return cells;
  },
};
