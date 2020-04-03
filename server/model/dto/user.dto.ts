import Player from '../sequelize/player.model';
import { UserRole } from '../sequelize/types';

export interface UserDTO {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  role: UserRole;
  birthday: Date | null;
  label: string;
  playerId?: number;
  player?: Player;
}
