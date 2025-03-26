import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { userStub } from '../../../../libs/domain/test/user/stub/user.stub';
import { AdminModule } from '../../src/admin.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { userPassword } from '@common/constant/example';

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

  it('post - /sign-up', (done) => {
    request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({
        name: userStub.name,
        email: userStub.email,
        password: userPassword,
      })
      .expect(201, done);
  });

  it('post - /sign-in', (done) => {
    request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({
        email: userStub.email,
        password: userPassword,
      })
      .expect(201, done);
  });
});
