import { ICell } from '../../@common/dto';
import { RootState } from '../../@common/models';

// Get state from store
export const Stage2Selector = {
	isLoading: ({ stage2State: { isLoading } }: RootState): boolean => isLoading,
	getCells: ({ stage2State: { cells } }: RootState): ICell[][] | undefined => cells,
	getCount: ({ stage2State: { count } }: RootState): number | undefined => count,
};
