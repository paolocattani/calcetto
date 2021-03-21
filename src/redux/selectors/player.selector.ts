import { PlayerDTO } from '../../@common/dto';
import { RootState } from '../../@common/models';

// Get state from store
export const PlayerSelector = {
	// Default states
	isLoading: ({ playerState: { isLoading } }: RootState): boolean => isLoading,
	isSaving: ({ playerState: { isSaving } }: RootState): boolean => isSaving,
	// Player
	getPlayersList: ({ playerState: { playersList } }: RootState): PlayerDTO[] => playersList,
	getPlayer: ({ playerState: { player } }: RootState): PlayerDTO | undefined => player,
};
