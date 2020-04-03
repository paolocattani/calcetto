import { TournamentProgress } from '../sequelize/types';

export interface TournamentDTO {
  id: number;
  name: string;
  date: Date;
  progress: TournamentProgress;
  public: boolean;
  label: string;
  ownerId?: number;
}
