import { RootState } from '../../@common/models';

// Get state from store
export const StatsSelector = {
	isLoading: ({ statsState: { isLoading } }: RootState) => isLoading,
	getPlayerStat: ({ statsState: { players } }: RootState) => players,
	getPairStat: ({ statsState: { pairs } }: RootState) => pairs,
};
