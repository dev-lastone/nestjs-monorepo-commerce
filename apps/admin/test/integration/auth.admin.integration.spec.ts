import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { userStub } from '../../../../libs/domain/test/user/stub/user.stub';
import { AdminModule } from '../../src/admin.module';
import { initializeTransactionalContext } from 'typeorm-transactional';

describe('admin auth', () => {
  let app;

  beforeAll(async () => {
    initializeTransactionalContext();

    const module = await Test.createTestingModule({
      imports: [AdminModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('post - /sign-up', () => {
    return request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({
        email: userStub.email,
        password: userStub.password,
      })
      .expect({});
  });
});
