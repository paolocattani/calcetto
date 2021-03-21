import { PairDTO, Stage1Row } from '../../@common/dto';
import { RootState } from '../../@common/models';

// Get state from store
export const Stage1Selector = {
	isLoading: ({ stage1State: { isLoading } }: RootState): boolean => isLoading,
	getSelectedRows: (stageName: string, { stage1State: { selectedRows } }: RootState): Stage1Row[] =>
		selectedRows && selectedRows.size > 0 && selectedRows.get(stageName) ? selectedRows.get(stageName)! : [],
	getSelectedPairs: ({ stage1State: { selectedPairs } }: RootState): PairDTO[] => selectedPairs,
	getToogleRefresh: ({ stage1State: { toogleRefresh } }: RootState): boolean => toogleRefresh,
};
