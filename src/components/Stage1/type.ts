export type Pair = {
  pairAlias: string;
  stage1Name: string;
  placement: number;
  paid1: boolean;
  paid2: boolean;
  tournamentId: number;
  player1Id: number;
  player2Id: number;
};

export type handlerPropsType = {
  pairsList: Pair[];
};

export type headerPropsType = {
  title: string;
  saved: boolean;
};
