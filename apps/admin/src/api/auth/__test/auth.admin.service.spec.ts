import { Test, TestingModule } from '@nestjs/testing';
import { AuthAdminService } from '../auth.admin.service';
import { PostAuthAdminRequestDto } from '../auth.admin.dto';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@domain/domain/auth/auth.service';
import {
  adminUserStub,
  invalidAdminUserStub,
} from '@domain/domain/user/__stub/admin-user.stub';

describe('AuthAdminService', () => {
  let authAdminService: AuthAdminService;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AuthAdminService,
        {
          provide: AuthService,
          useValue: {
            createToken: jest.fn(),
          },
        },
      ],
    }).compile();

    authAdminService = app.get<AuthAdminService>(AuthAdminService);
    authService = app.get<AuthService>(AuthService);
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

      jest.spyOn(authService, 'createToken').mockReturnValue('mockToken');

      const result = authAdminService.signIn(postAuthAdminRequestDto);

      expect(result).toEqual('mockToken');
    });
  });
});
