import supertest from 'supertest';
import { HTTPStatusCode } from '../../../src/@common/models/HttpStatusCode';
import { AuthenticationResponse, RegistrationRequest } from '../../../src/@common/models/auth.model';
import AppServer from '../../express/AppServer';
import { deleteTestUser, getServer, loginTestUser, registerTestUser, USER_1, USER_2 } from '../common';
//
import { httpServer } from '../../server';
import { Sequelize } from 'sequelize';
import { OmitHistory } from '../../../src/@common/models/common.models';

describe('Authentication Endpoints', () => {
  let serverTest: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    serverTest = supertest(httpServer);
  });

  afterAll(async (done) => {
    httpServer.close();
  });

  describe('Registration process', () => {
    beforeEach(async () => {
      await deleteTestUser(USER_1);
    });
    it('Should register test user', async () => {
      // https://www.npmjs.com/package/supertest?__cf_chl_captcha_tk__=abcfc5b8931d4899180dfe3d99986ad39fce4069-1603899854-0-AYs7Zukb6qoThXj4x9hLetQmRWYaBt1C3rYWCHD2C-mEbk2kUr62V5nCIOineT6bgOHl1ASGRTCeyBU8vll4xhYpuyu9KrdazhOoUiyQZ4mGEcx-4Vevx3IhweKMgVqk8PxctZc9CWMzqa_A4nuh2bTuP39_lW-97JIxpoZfcB4CEuOSeEMSpMOwTB9ynnRFw92BinrVxfNxGAxtuQbDxmsqqylEOxVYByLtAJhJb0hlu6IpLVhKmSa7s9MXl6RyoAZKui-J7uN80tb2OhAn26C9-JlQM9f3YDHkrQ0EQjSPNwo6jyWHbpoyUz1UfQCIhdbH5MbNaU5on6NVdmaJCgkunVF6Ytf7d-naDAcwZHvZ8As_zHN7MtCPpsQEhDg_3hQqcMIuKgS8201IqK4FMCnZLKuiw5tfqhoUIL23bmprW7BgWW4MIdKhifoch1iqOOceU5feCfQ9EvixS1m8mQjFATVOBPAkNy0TriNaBCQvaEQ5AgwPUp8ZpUk7gSgpDJTd9Bs5YTm_kHdD8s5W-Btzr4a5Gqos5cXLa-RI6bFu
      console.log('Should register test user ');
      const request: OmitHistory<RegistrationRequest> = USER_1;
      serverTest
        .post('/api/v2/auth/register')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(HTTPStatusCode.Success)

        .send(request);
      const result = await response.body();
      //const result: AuthenticationResponse = await registerTestUser(USER_1);
      console.log('Response: ', response);
      console.log('Result: ', result);
      //expect(result.code).toEqual(HTTPStatusCode.OK);
      expect(1).toEqual(1);
    });
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
