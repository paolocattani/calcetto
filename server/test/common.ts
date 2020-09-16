import { AuthenticationResponse } from '../models/client/auth.models';

import fetch from 'node-fetch';

export const BASE_URL = `http://${process.env.SERVER_HOST || 'localhost'}:${process.env.PORT || '5001'}`;
export const DEFAULT_HEADERS = { headers: { 'Content-Type': 'application/json' } };

export const USER_REGISTRATION = {
  // https://www.fakenamegenerator.com/gen-male-us-it.php
  username: 'dummy',
  name: 'William',
  surname: 'J. Ayers',
  email: 'WilliamJAyers@armyspy.com',
  cEmail: 'WilliamJAyers@armyspy.com',
  password: 'dummyPassword1',
  cPassword: 'dummyPassword1',
  phone: '0362 3981900',
  birthday: new Date(1939, 0, 16),
  playerRole: 'Master',
};

export const USER_LOGIN = {
  // https://www.fakenamegenerator.com/gen-male-us-it.php
  username: 'dummy',
  name: 'William',
  surname: 'J. Ayers',
  email: 'WilliamJAyers@armyspy.com',
  cEmail: 'WilliamJAyers@armyspy.com',
  password: 'dummyPassword1',
  cPassword: 'dummyPassword1',
  phone: '0362 3981900',
  birthday: new Date(1939, 0, 16),
  playerRole: 'Master',
};
export const registerTestUser = async (user: RegistrationRequest): Promise<AuthenticationResponse> => {
  const response = await fetch(`${BASE_URL}/api/v1/auth/register`, {
    method: 'POST',
    body: JSON.stringify(),
    ...DEFAULT_HEADERS,
  });
  return await response.json();
};

export const loginTestUser = async (): Promise<AuthenticationResponse> => {
  const response = await fetch(`${BASE_URL}/api/v1/auth/authenticate`, {
    method: 'POST',
    body: JSON.stringify({
      // https://www.fakenamegenerator.com/gen-male-us-it.php
      username: 'dummy',
      password: 'dummyPassword1',
    }),
    ...DEFAULT_HEADERS,
  });
  return await response.json();
};

export const deleteTestUser = async (): Promise<AuthenticationResponse> => {
  const response = await fetch(`${BASE_URL}/api/v1/auth/delete`, {
    method: 'DELETE',
    body: JSON.stringify({
      // https://www.fakenamegenerator.com/gen-male-us-it.php
      username: 'dummy',
      email: 'WilliamJAyers@armyspy.com',
      password: 'dummyPassword1',
    }),
    ...DEFAULT_HEADERS,
  });
  return await response.json();
};
