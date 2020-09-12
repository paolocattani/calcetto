export interface PlayerDTO {
  id: number | null;
  name: string;
  surname: string;
  alias: string;
  label: string;
  role: PlayerRole;
  email: string;
  phone: string;
  userId?: number;
  match_played?: number;
  match_won?: number;
  total_score?: number;
  editable: boolean;
  rowNumber: number;
}

export enum PlayerRole {
  NotAPlayer = 'Non sono un giocatore',
  GoalKeeper = 'Portiere',
  Master = 'Master',
  Striker = 'Attaccante',
}
