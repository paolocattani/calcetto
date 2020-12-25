import { RootState } from '../../@common/models';

// Get state from store
export const Stage2Selector = {
	isLoading: ({ stage2State: { isLoading } }: RootState) => isLoading,
	getCells: ({ stage2State: { cells } }: RootState) => cells,
	getCount: ({ stage2State: { count } }: RootState) => count,
	getToogleRefresh: ({ stage2State: { toogleRefresh } }: RootState) => toogleRefresh,
};
