import { RootState } from 'models/common.model';

// Get state from store
export const TournamentSelector = {
  isLoading: ({ tournamentState: { isLoading } }: RootState) => isLoading,
  getTournament: ({ tournamentState: { tournament } }: RootState) => tournament,
  getTournamentsList: ({ tournamentState: { tournamentsList } }: RootState) => tournamentsList,
};
