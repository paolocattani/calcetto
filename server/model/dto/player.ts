import User from '../sequelize/user.model';

export interface PlayerDTO {
  id: number;
  name: string;
  surname: string;
  alias: string;
  role: string;
  email: string;
  phone: string;
  match_played: number;
  match_won: number;
  total_score: number;
  userId?: number;
  user?: User;
  editable: boolean;
  label: string;
}
