import { TournamentDTO } from '../../@common/dto';
import { RootState } from '../../@common/models';

// Get state from store
export const TournamentSelector = {
	isLoading: ({ tournamentState: { isLoading } }: RootState): boolean => isLoading,
	getTournament: ({ tournamentState: { tournament } }: RootState): TournamentDTO | null => tournament,
	getTournamentsList: ({ tournamentState: { tournamentsList } }: RootState): TournamentDTO[] => tournamentsList,
};
