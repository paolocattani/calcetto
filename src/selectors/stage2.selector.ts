import { RootState } from 'models';

// Get state from store
export const Stage2Selector = {
  isLoading: ({ stage2State: { isLoading } }: RootState) => isLoading,
  getCells: ({ stage2State: { cells } }: RootState) => cells,
  getRowsNumber: ({ stage2State: { rowsNumber } }: RootState) => rowsNumber,
};
