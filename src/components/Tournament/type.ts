import { PairModel } from '../Pair/type';

export type TournamentModel = {
  id: number | null;
  name: string;
  ownerId: number;
  progress: string;
  public: boolean;
  pairs: PairModel[];
};

export type TournamentProgressType = 'New' | 'PairsSelection' | 'Stage1' | 'Stage2';

export const TournamentProgress = { New: 'new', PairsSelection: 'PairsSelection', Stage1: 'Stage1', Stage2: 'Stage2' };
