import { RootState } from 'models';

// Get state from store
export const Stage1Selector = {
  isLoading: ({ stage1State: { isLoading } }: RootState) => isLoading,
  getSelectedRows: ({ stage1State: { selectedRows } }: RootState) => selectedRows || null,
  getSelectedPairs: ({ stage1State: { selectedPairs } }: RootState) => selectedPairs,
  getNeedRefresh: ({ stage1State: { needRefresh } }: RootState) => needRefresh,
};
