import { Test, TestingModule } from '@nestjs/testing';
import { AuthAdminService } from '../auth.admin.service';
import { PostAuthAdminRequestDto } from '../auth.admin.dto';
import { UnauthorizedException } from '@nestjs/common';
import {
  adminUserStub,
  invalidAdminUserStub,
} from '@domain/admin-user/__stub/admin-user.stub';
import { AdminUserRepo } from '@domain/admin-user/admin-user.repo';
import { AuthApplicationService } from '@application/auth/auth.application.service';

describe('AuthAdminService', () => {
  let authAdminService: AuthAdminService;
  let authApplicationService: AuthApplicationService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AuthAdminService,
        AdminUserRepo,
        {
          provide: AuthApplicationService,
          useValue: {
            createToken: jest.fn(),
          },
        },
      ],
    }).compile();

    authAdminService = app.get(AuthAdminService);
    authApplicationService = app.get(AuthApplicationService);
  });

  describe('signIn', () => {
    it('잘못된 이메일', async () => {
      const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
      postAuthAdminRequestDto.email = invalidAdminUserStub.email;
      postAuthAdminRequestDto.password = adminUserStub.password;

      expect(() => authAdminService.signIn(postAuthAdminRequestDto)).toThrow(
        new UnauthorizedException(),
      );
    });

    it('잘못된 패스워드', async () => {
      const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
      postAuthAdminRequestDto.email = adminUserStub.email;
      postAuthAdminRequestDto.password = invalidAdminUserStub.password;

      expect(() => authAdminService.signIn(postAuthAdminRequestDto)).toThrow(
        new UnauthorizedException(),
      );
    });

    it('성공', async () => {
      const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
      postAuthAdminRequestDto.email = adminUserStub.email;
      postAuthAdminRequestDto.password = adminUserStub.password;

      jest
        .spyOn(authApplicationService, 'createToken')
        .mockReturnValue('mockToken');

      const result = authAdminService.signIn(postAuthAdminRequestDto);

      expect(result).toEqual('mockToken');
    });
  });
});
