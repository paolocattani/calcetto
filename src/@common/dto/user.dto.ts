import { PlayerDTO } from '.';

export interface UserDTO {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  role: UserRole;
  birthday: Date;
  label: string;
  player?: PlayerDTO;
}
export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}
