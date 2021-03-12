export interface TournamentDTO {
	id: number;
	name: string;
	date: Date;
	progress: TournamentProgress;
	public: boolean;
	autoOrder: boolean;
	label: string;
	ownerId: number;
}

export enum TournamentProgress {
	New = 'new',
	PairsSelection = 'pairsSelection',
	Stage1 = 'stage1',
	Stage2 = 'stage2',
}
