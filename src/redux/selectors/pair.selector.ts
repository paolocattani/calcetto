import { PairDTO } from '../../@common/dto';
import { RootState } from '../../@common/models';

// Get state from store
export const PairSelector = {
	isLoading: ({ pairState: { isLoading } }: RootState): boolean => isLoading,
	getPairsList: ({ pairState: { pairsList } }: RootState): PairDTO[] | undefined => pairsList,
};
