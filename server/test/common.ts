import {
  AuthenticationResponse,
  DeleteUserRequest,
  LoginRequest,
  RegistrationRequest,
} from '../../src/@common/models/auth.model';
import { OmitHistory } from '../../src/@common/models/common.models';
import { deleteWrapper, postWrapper } from '../../src/@common/utils/fetch.utils';
import { PlayerRole } from '../../src/@common/dto/player.dto';
import AppServer from '../express/AppServer';

export const USER_1 = {
  // https://www.fakenamegenerator.com/gen-male-us-it.php
  username: 'dummy1',
  name: 'William1',
  surname: 'J. Ayers1',
  email: 'WilliamJAyers@spy1.com',
  cEmail: 'WilliamJAyers@spy1.com',
  password: 'dummyPassword1',
  cPassword: 'dummyPassword1',
  phone: '0362 3981901',
  birthday: new Date(1939, 0, 16),
  playerRole: PlayerRole.Master,
};

export const USER_2 = {
  // https://www.fakenamegenerator.com/gen-male-us-it.php
  username: 'dummy2',
  name: 'William2',
  surname: 'J. Ayers2',
  email: 'WilliamJAyers@army2.com',
  cEmail: 'WilliamJAyers@army2.com',
  password: 'dummyPassword12',
  cPassword: 'dummyPassword12',
  phone: '0362 398190022',
  birthday: new Date(1939, 0, 16),
  playerRole: PlayerRole.GoalKeeper,
};

export const registerTestUser = async (
  registrationRequest: OmitHistory<RegistrationRequest>
): Promise<AuthenticationResponse> =>
  await postWrapper<RegistrationRequest, AuthenticationResponse>('/api/v2/auth/register', registrationRequest);

export const loginTestUser = async (loginRequest: OmitHistory<LoginRequest>): Promise<AuthenticationResponse> =>
  await postWrapper<LoginRequest, AuthenticationResponse>('http://localhost:5001/api/v2/auth/login', loginRequest);

export const deleteTestUser = async (deleteRequest: OmitHistory<DeleteUserRequest>): Promise<AuthenticationResponse> =>
  await deleteWrapper<DeleteUserRequest, AuthenticationResponse>('/api/v2/auth/delete', deleteRequest);

export async function getServer(): Promise<AppServer> {
  const server = new AppServer();
  await server.connect();
  server.start();
  return server;
}
