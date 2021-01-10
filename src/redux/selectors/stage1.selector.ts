import { RootState } from '../../@common/models';

// Get state from store
export const Stage1Selector = {
	isLoading: ({ stage1State: { isLoading } }: RootState) => isLoading,
	getSelectedRows: (stageName:string,{ stage1State: { selectedRows } }: RootState) => selectedRows && selectedRows.size > 0 ? selectedRows.get(stageName) : null,
	getSelectedPairs: ({ stage1State: { selectedPairs } }: RootState) => selectedPairs,
	getToogleRefresh: ({ stage1State: { toogleRefresh } }: RootState) => toogleRefresh,
};
