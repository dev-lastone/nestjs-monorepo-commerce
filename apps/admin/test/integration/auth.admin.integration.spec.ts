import { IntegrationTestBase } from '@common/test/integration-test.base';
import { AuthAdminModule } from '../../src/api/auth/auth.admin.module';
import * as request from 'supertest';
import { userStub } from '../../../../libs/domain/test/user/stub/user.stub';
import { userPassword } from '@common/constant/example';
import { TestHelperAdminModule } from './test-helper.admin.module';

describe('admin auth', () => {
  const testBase = new IntegrationTestBase();

  beforeAll(async () => {
    await testBase.beforeAll(AuthAdminModule, TestHelperAdminModule);
  });

  afterAll(async () => {
    await testBase.afterAll();
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
    expect(response.body).toHaveProperty('token');
  });
  //
  // it('post - /sign-in', async () => {
  //   // First create a user
  //   await request(testBase.app.getHttpServer()).post('/auth/sign-up').send({
  //     name: userStub.name,
  //     email: userStub.email,
  //     password: userPassword,
  //   });
  //
  //   // Then try to sign in
  //   const response = await request(testBase.app.getHttpServer())
  //     .post('/auth/sign-in')
  //     .send({
  //       email: userStub.email,
  //       password: userPassword,
  //     });
  //
  //   expect(response.status).toBe(201);
  //   expect(response.body).toHaveProperty('token');
  // });
});
