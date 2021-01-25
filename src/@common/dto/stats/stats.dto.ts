export interface Stats {
	ratiotot: number; // @unused
	// Totals
	totMatch: number;
	totS1: number;
	totS2: number;
	// Ratios
	ratioS1: number;
	ratioS2: number;
	ratioTot: number;
	// Winnings
	s1win: number;
	s2win: number;
	totwin: number;
	winPercentage: number;
	winS1Percentage: number;
	winS2Percentage: number;
	// Defeats
	s1def: number;
	s2def: number;
	totdef: number;
	defPercentage: number;
	defS1Percentage: number;
	defS2Percentage: number;
}
