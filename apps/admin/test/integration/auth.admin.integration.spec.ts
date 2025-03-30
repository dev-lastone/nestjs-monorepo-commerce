import { IntegrationTestBase } from '@common/test/integration-test.base';
import { AuthAdminModule } from '../../src/api/auth/auth.admin.module';
import * as request from 'supertest';
import { userStub } from '../../../../libs/domain/test/user/stub/user.stub';
import { userPassword } from '@common/constant/example';
import { TestHelperAdminModule } from './test-helper.admin.module';
import { AdminUser } from '../../src/domain/admin-user/admin-user.entity';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { SUCCESS } from '@common/constant/constants';

describe('admin auth', () => {
  const testBase = new IntegrationTestBase();

  beforeAll(async () => {
    await testBase.beforeAll(AuthAdminModule, TestHelperAdminModule);
  });

  afterEach(async () => {
    await testBase.afterEach(AdminUser);
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
