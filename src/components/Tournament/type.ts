import { PairModel } from '../Pair/type';

export type TournamentModel = {
  id: number | null;
  name: string;
  ownerId: number;
  progress: string;
  public: boolean;
  pairs: PairModel[];
};
