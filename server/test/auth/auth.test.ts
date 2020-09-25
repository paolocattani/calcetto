import supertest from 'supertest';
import { HTTPStatusCode } from '../../../src/@common/models/HttpStatusCode';
import { AuthenticationResponse } from '../../../src/@common/models/auth.model';
import AppServer from '../../express/AppServer';
import { deleteTestUser, getServer, loginTestUser, registerTestUser, USER_1, USER_2 } from '../common';

describe('Authentication Endpoints', () => {
  let serverTest: supertest.SuperTest<supertest.Test>;
  beforeAll(async function () {
    console.log('beforeAll ');
    const server = await getServer();
    serverTest = supertest(server.application);
  });

  /*
  afterAll(async () => {
    //await deleteTestUser(USER_1);
    //await deleteTestUser(USER_2);
  });

  describe('Registration process', () => {
   /*
    beforeEach(async () => {
      //await deleteTestUser(USER_1);
    });
*/
  it('Should register test user', async () => {
    console.log('Should register test user ');
    const response = await serverTest.post('http://localhost:5001/api/v2/auth/register').send(USER_1);
    const result = await response.body();
    //const result: AuthenticationResponse = await registerTestUser(USER_1);
    console.log('Response: ', response);
    console.log('Result: ', result);
    expect(result.code).toEqual(HTTPStatusCode.OK);
  });
});
/*
  describe('Login process', () => {
    beforeAll(async () => {
      await registerTestUser(USER_2);
    });

    it('Should login', async () => {
      const result: AuthenticationResponse = await loginTestUser(USER_2);
      console.log('Response: ', result);
      expect(result.code).toEqual(HTTPStatusCode.OK);
    });0
  });

});
*/
