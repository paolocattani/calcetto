import { PairModel } from '../Pair/type';

export type TournamentProgressType = 'New' | 'PairsSelection' | 'Stage1' | 'Stage2';

export type TournamentModel = {
  id: number;
  name: string;
  date: Date;
  progress: TournamentProgressType;
  public: boolean;
  label: string;
  ownerId?: number;
  pairs?: PairModel[];
};

export type selectOptions = {
  label: string;
  value: string;
  data: TournamentModel;
};

export const TournamentProgress = { New: 'New', PairsSelection: 'PairsSelection', Stage1: 'Stage1', Stage2: 'Stage2' };
