import { HTTPStatusCode } from '../../../src/@common/models/HttpStatusCode';
import { AuthenticationResponse } from '../../models/client/auth.models';
import { deleteTestUser, loginTestUser, registerTestUser } from '../common';

describe('Authentication Endpoints', () => {
  afterAll(async () => {
    await deleteTestUser();
  });

  describe('Registration process', () => {
    beforeEach(async () => {
      await deleteTestUser();
    });

    it('Should register test user', async () => {
      const result: AuthenticationResponse = await registerTestUser();
      console.log('Response: ', result);
      expect(result.code).toEqual(HTTPStatusCode.OK);
    });
  });

  describe('Login process', () => {
    beforeAll(async () => {
      await registerTestUser();
    });

    it('Should login', async () => {
      const result: AuthenticationResponse = await loginTestUser();
      console.log('Response: ', result);
      expect(result.code).toEqual(HTTPStatusCode.OK);
    });
  });
});
