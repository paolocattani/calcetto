import { RootState } from 'redux/models/root.model';

// Get state from store
export const TournamentSelector = {
  isLoading: ({ tournamentState: { isLoading } }: RootState) => isLoading,
  getTournament: ({ tournamentState: { tournament } }: RootState) => tournament,
  getTournamentsList: ({ tournamentState: { tournamentsList } }: RootState) => tournamentsList,
};
