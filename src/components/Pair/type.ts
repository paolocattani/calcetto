import { PlayerModel } from '../Player/type';
import { TournamentDTO } from '../../models/tournament.model';

export type propsType = {
  tournametId: number;
};

export type headerPropsType = {
  tournament: TournamentDTO;
};
export type noDataPropsType = {
  optionsLength: number;
  isEditable: boolean;
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
  tournamentId: TournamentDTO;
  player1Id: number;
  player1: PlayerModel;
  player2Id: number;
  player2: PlayerModel;
};
