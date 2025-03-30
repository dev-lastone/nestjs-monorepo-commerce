import { IntegrationTestBase } from '@common/test/integration-test.base';
import * as request from 'supertest';
import { userStub } from '../../../../libs/domain/test/user/stub/user.stub';
import { userPassword } from '@common/constant/example';
import { TestHelperAppModule } from './test-helper.app.module';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { SUCCESS } from '@common/constant/constants';
import { AuthAppModule } from '../../src/api/auth/auth.app.module';
import { AppUser } from '@domain/app-user/app-user.entity';

describe('app auth', () => {
  const testBase = new IntegrationTestBase();

  beforeAll(async () => {
    await testBase.beforeAll(AuthAppModule, TestHelperAppModule);
  });

  afterEach(async () => {
    await testBase.afterEach(AppUser);
  });

  afterAll(async () => {
    await testBase.close();
  });

  it('post - /sign-up', async () => {
    const response = await request(testBase.app.getHttpServer())
      .post('/auth/sign-up')
      .send({
        name: userStub.name,
        email: userStub.email,
        password: userPassword,
      });

    expect(response.status).toBe(201);
    expect(typeof response.text).toBe('string');
  });

  describe('post - /sign-in', () => {
    it(ERROR_MESSAGES.InvalidSignIn, async () => {
      await request(testBase.app.getHttpServer())
        .post('/auth/sign-in')
        .send({
          email: userStub.email,
          password: userPassword,
        })
        .expect(401, {
          message: ERROR_MESSAGES.InvalidSignIn,
          error: 'Unauthorized',
          statusCode: 401,
        });
    });

    it(SUCCESS, async () => {
      await request(testBase.app.getHttpServer()).post('/auth/sign-up').send({
        name: userStub.name,
        email: userStub.email,
        password: userPassword,
      });

      const response = await request(testBase.app.getHttpServer())
        .post('/auth/sign-in')
        .send({
          email: userStub.email,
          password: userPassword,
        });

      expect(response.status).toBe(201);
      expect(typeof response.text).toBe('string');
    });
  });
});
