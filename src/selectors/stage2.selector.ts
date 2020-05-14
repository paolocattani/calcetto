import { RootState, ICell } from 'models';

// Get state from store
export const Stage2Selector = {
  isLoading({ stage2State: { isLoading } }: RootState): boolean {
    return isLoading;
  },
  getCells({ stage2State: { cells } }: RootState): ICell[][] | undefined {
    return cells;
  },
  getRowsNumber({ stage2State: { rowsNumber } }: RootState): number | undefined {
    return rowsNumber;
  },
};
