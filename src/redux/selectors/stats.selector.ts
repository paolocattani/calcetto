import { StatsPairDTO, StatsPlayerDTO } from '../../@common/dto';
import { RootState } from '../../@common/models';

// Get state from store
export const StatsSelector = {
	isLoading: ({ statsState: { isLoading } }: RootState): boolean => isLoading,
	getPlayerStat: ({ statsState: { players } }: RootState): StatsPlayerDTO[] | undefined => players,
	getPairStat: ({ statsState: { pairs } }: RootState): StatsPairDTO[] | undefined => pairs,
};
