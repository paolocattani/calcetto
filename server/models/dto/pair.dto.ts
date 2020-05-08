import { PlayerDTO } from './player.dto';

export interface PairDTO {
  id: number | null;
  rowNumber?: number;
  tId: number;
  alias?: string;
  stage1Name: string;
  paid1: boolean;
  paid2: boolean;
  player1?: PlayerDTO;
  player2?: PlayerDTO;
  placement: number;
  label?: string;
}
