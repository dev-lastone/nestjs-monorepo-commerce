import { Test, TestingModule } from '@nestjs/testing';
import { AuthAdminController } from '../auth.admin.controller';
import { AuthAdminService } from '../auth.admin.service';
import { PostAuthAdminRequestDto } from '../auth.admin.dto';

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

  describe('signIn', () => {
    it('성공', async () => {
      const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
      postAuthAdminRequestDto.email = 'test@test.com';
      postAuthAdminRequestDto.password = '1234';

      await expect(
        authAdminController.signIn(postAuthAdminRequestDto),
      ).resolves.toEqual({
        token: 'mockToken',
      });
    });
  });
});
