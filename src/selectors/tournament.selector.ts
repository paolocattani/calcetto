import { RootState } from 'models/common.model';
import { TournamentDTO } from 'models/tournament.model';

// Get state from store
export const TournamentSelector = {
  isLoading({ tournamentState: { isLoading } }: RootState): boolean {
    return isLoading;
  },
  // Get selected Tournament
  getTournament({ tournamentState: { tournament } }: RootState): TournamentDTO | null {
    return tournament;
  },
  // Get tournament List
  getTournamentsList({ tournamentState: { tournamentsList } }: RootState): TournamentDTO[] {
    return tournamentsList;
  },
};
