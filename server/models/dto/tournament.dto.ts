export interface TournamentDTO {
  id: number;
  name: string;
  date: Date;
  progress: TournamentProgress;
  public: boolean;
  autoOrder: boolean;
  label: string;
  ownerId?: number;
}

export enum TournamentProgress {
  New = 'New',
  PairsSelection = 'PairsSelection',
  Stage1 = 'Stage1',
  Stage2 = 'Stage2',
}
