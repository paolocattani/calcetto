import { TournamentModel } from '../Tournament/type';
import { PlayerModel } from '../Player/type';

export type propsType = {
  tournametId: number;
};

export type headerPropsType = {
  tournament: TournamentModel;
};
export type noDataPropsType = {
  optionsLength: number;
  addRow: () => void;
};

export type PairModel = {
  id: number;
  pairAlias: string;
  stage1Name: string;
  placement: number;
  paid1: boolean;
  paid2: boolean;
  tournament: number;
  tournamentId: TournamentModel;
  player1Id: number;
  player1: PlayerModel;
  player2Id: number;
  player2: PlayerModel;
};
