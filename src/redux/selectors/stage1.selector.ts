import { RootState } from '../../@common/models';

// Get state from store
export const Stage1Selector = {
  isLoading: ({ stage1State: { isLoading } }: RootState) => isLoading,
  getSelectedRows: ({ stage1State: { selectedRows } }: RootState) => selectedRows || null,
  getSelectedPairs: ({ stage1State: { selectedPairs } }: RootState) => selectedPairs,
  getToogleRefresh: ({ stage1State: { toogleRefresh } }: RootState) => toogleRefresh,
  // Utilizzare una closure nel compoanente per accedere allo specifico stage
  getStages: ({ stage1State: { stages } }: RootState) => stages,
};
