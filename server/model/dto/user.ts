import Player from '../sequelize/player.model';

export interface UserDTO {
  id: number;
  username: String;
  name: string;
  surname: string;
  email: string;
  phone: string;
  role: string;
  birthday: Date | null;
  label: string;
  playerId?: number;
  player?: Player;
}
