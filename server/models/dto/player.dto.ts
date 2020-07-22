export interface PlayerDTO {
  id: number;
  name: string;
  surname: string;
  alias: string;
  label: string;
  role: PlayerRole;
  email?: string;
  phone?: string;
  userId?: number;
  match_played: number;
  match_won: number;
  total_score: number;
  editable: boolean;
}

export enum PlayerRole {
  None = 'No',
  NotAPlayer = 'Non sono un giocatore',
  GoalKeeper = 'Portiere',
  Master = 'Master',
  Striker = 'Attaccante',
}
