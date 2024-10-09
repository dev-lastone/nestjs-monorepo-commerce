import { Test, TestingModule } from '@nestjs/testing';
import { AuthAdminController } from '../auth.admin.controller';
import { AuthAdminService } from '../auth.admin.service';
import { PostAuthAdminRequestDto } from '../auth.admin.dto';
import { adminUserStub } from '@domain/domain/admin-user/__stub/admin-user.stub';

describe('AuthAdminController', () => {
  let authAdminController: AuthAdminController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthAdminController],
      providers: [
        {
          provide: AuthAdminService,
          useValue: {
            signIn: jest.fn().mockResolvedValue({ token: 'mockToken' }),
          },
        },
      ],
    }).compile();

    authAdminController = app.get<AuthAdminController>(AuthAdminController);
  });

  it('signIn', async () => {
    const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
    postAuthAdminRequestDto.email = adminUserStub.email;
    postAuthAdminRequestDto.password = adminUserStub.password;

    await expect(
      authAdminController.signIn(postAuthAdminRequestDto),
    ).resolves.toEqual({
      token: 'mockToken',
    });
  });
});
