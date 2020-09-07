import { GenericReponse } from './common.models';
import { UserDTO } from 'models/dto';

export interface AuthenticateRequest {
  username: string;
  password: string;
}

export interface AuthenticationResponse extends GenericReponse {
  user?: UserDTO;
}
