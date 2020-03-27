import { PairModel } from '../Pair/type';

export type TournamentProgressType = 'New' | 'PairsSelection' | 'Stage1' | 'Stage2';

export type TournamentModel = {
  id: number | null;
  name: string;
  ownerId: number;
  progress: TournamentProgressType;
  public: boolean;
  pairs?: PairModel[];
};

export type selectOptions = {
  label: string;
  value: string;
  data: TournamentModel;
};

export const TournamentProgress = { New: 'new', PairsSelection: 'PairsSelection', Stage1: 'Stage1', Stage2: 'Stage2' };
