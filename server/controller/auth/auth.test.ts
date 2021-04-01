import '@common/utils/env';
import supertest from 'supertest';
//
import { loginTestUser, registerTestUser } from '../../test/common';
import { UserDTO } from '@common/dto';
import { HTTPStatusCode } from '@common/models';
import { APPLICATION_JSON, getFormattedRandomUser, TEST_HEADERS } from '../../test/test.utils';
import bootstrap from '../../server';
import AppServer from '../../express/AppServer';

describe('Authentication Endpoints', () => {
	let serverTest: supertest.SuperTest<supertest.Test>;
	let user1: UserDTO;
	let user2: UserDTO;
	let application: AppServer;
	beforeAll(async () => {
		application = await bootstrap();
		serverTest = supertest(application.httpServer);
		const users = await getFormattedRandomUser(2);
		user1 = users[0];
		user2 = users[1];
	});

	afterAll(async () => {
		await application.stop();
	});

	describe('Registration process', () => {
		beforeEach(async () => {
			try {
				await fetch('/api/v2/auth/delete', {
					method: 'DELETE',
					body: JSON.stringify(user1),
					headers: TEST_HEADERS,
				});
			} catch (error) {}
		});

		it('Should register User1', async () => {
			// https://www.npmjs.com/package/supertest?__cf_chl_captcha_tk__=abcfc5b8931d4899180dfe3d99986ad39fce4069-1603899854-0-AYs7Zukb6qoThXj4x9hLetQmRWYaBt1C3rYWCHD2C-mEbk2kUr62V5nCIOineT6bgOHl1ASGRTCeyBU8vll4xhYpuyu9KrdazhOoUiyQZ4mGEcx-4Vevx3IhweKMgVqk8PxctZc9CWMzqa_A4nuh2bTuP39_lW-97JIxpoZfcB4CEuOSeEMSpMOwTB9ynnRFw92BinrVxfNxGAxtuQbDxmsqqylEOxVYByLtAJhJb0hlu6IpLVhKmSa7s9MXl6RyoAZKui-J7uN80tb2OhAn26C9-JlQM9f3YDHkrQ0EQjSPNwo6jyWHbpoyUz1UfQCIhdbH5MbNaU5on6NVdmaJCgkunVF6Ytf7d-naDAcwZHvZ8As_zHN7MtCPpsQEhDg_3hQqcMIuKgS8201IqK4FMCnZLKuiw5tfqhoUIL23bmprW7BgWW4MIdKhifoch1iqOOceU5feCfQ9EvixS1m8mQjFATVOBPAkNy0TriNaBCQvaEQ5AgwPUp8ZpUk7gSgpDJTd9Bs5YTm_kHdD8s5W-Btzr4a5Gqos5cXLa-RI6bFu
			serverTest
				.post('/api/v2/auth/register')
				.set('Accept', APPLICATION_JSON)
				.send(user1)
				.expect('Content-Type', /json/)
				.expect(HTTPStatusCode.Success);
		});

		it('Should not register user', async () => {
			// https://www.npmjs.com/package/supertest?__cf_chl_captcha_tk__=abcfc5b8931d4899180dfe3d99986ad39fce4069-1603899854-0-AYs7Zukb6qoThXj4x9hLetQmRWYaBt1C3rYWCHD2C-mEbk2kUr62V5nCIOineT6bgOHl1ASGRTCeyBU8vll4xhYpuyu9KrdazhOoUiyQZ4mGEcx-4Vevx3IhweKMgVqk8PxctZc9CWMzqa_A4nuh2bTuP39_lW-97JIxpoZfcB4CEuOSeEMSpMOwTB9ynnRFw92BinrVxfNxGAxtuQbDxmsqqylEOxVYByLtAJhJb0hlu6IpLVhKmSa7s9MXl6RyoAZKui-J7uN80tb2OhAn26C9-JlQM9f3YDHkrQ0EQjSPNwo6jyWHbpoyUz1UfQCIhdbH5MbNaU5on6NVdmaJCgkunVF6Ytf7d-naDAcwZHvZ8As_zHN7MtCPpsQEhDg_3hQqcMIuKgS8201IqK4FMCnZLKuiw5tfqhoUIL23bmprW7BgWW4MIdKhifoch1iqOOceU5feCfQ9EvixS1m8mQjFATVOBPAkNy0TriNaBCQvaEQ5AgwPUp8ZpUk7gSgpDJTd9Bs5YTm_kHdD8s5W-Btzr4a5Gqos5cXLa-RI6bFu
			serverTest
				.post('/api/v2/auth/register')
				.set('Accept', APPLICATION_JSON)
				.send(user1)
				.expect('Content-Type', /json/)
				.expect(HTTPStatusCode.BadRequest);
		});
	});

	describe('Login process', () => {
		beforeAll(async () => {
			await registerTestUser(user2);
		});

		it('Should login', async () => {
			const result = await loginTestUser(user2);
			expect(result.code).toEqual(HTTPStatusCode.OK);
		});

		it('Should not login', async () => {
			user2.password = 'wrong_password';
			const result = await loginTestUser(user2);
			expect(result.code).toEqual(HTTPStatusCode.BadRequest);
		});
	});
});
