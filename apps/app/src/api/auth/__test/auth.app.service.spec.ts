import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@domain/domain/auth/auth.service';
import { AuthAppService } from '../auth.app.service';
import {
  PostAuthAppRequestDto,
  PostAuthSignUpAppReqDto,
} from '../auth.app.dto';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';

describe('AuthAppService', () => {
  let authAppService: AuthAppService;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AuthAppService,
        {
          provide: AuthService,
          useValue: {
            createToken: jest.fn(),
          },
        },
      ],
    }).compile();

    authAppService = app.get<AuthAppService>(AuthAppService);
    authService = app.get<AuthService>(AuthService);
  });

  describe('signUp', () => {
    it(ERROR_MESSAGES.PasswordConfirm, async () => {
      const postAuthAdminRequestDto = new PostAuthSignUpAppReqDto();
      postAuthAdminRequestDto.name = '홍길동';
      postAuthAdminRequestDto.email = 'test@test.com';
      postAuthAdminRequestDto.password = '1234';
      postAuthAdminRequestDto.passwordConfirm = 'invalid';

      expect(() => authAppService.signUp(postAuthAdminRequestDto)).toThrow(
        ERROR_MESSAGES.PasswordConfirm,
      );
    });

    it('성공', async () => {
      const postAuthAdminRequestDto = new PostAuthSignUpAppReqDto();
      postAuthAdminRequestDto.name = '홍길동';
      postAuthAdminRequestDto.email = 'test@test.com';
      postAuthAdminRequestDto.password = '1234';
      postAuthAdminRequestDto.passwordConfirm = '1234';

      jest.spyOn(authService, 'createToken').mockReturnValue('mockToken');

      const result = authAppService.signUp(postAuthAdminRequestDto);

      expect(result).toEqual('mockToken');
    });
  });

  describe('signIn', () => {
    it('잘못된 이메일', async () => {
      const postAuthAppRequestDto = new PostAuthAppRequestDto();
      postAuthAppRequestDto.email = 'invalid@test.com';
      postAuthAppRequestDto.password = '1234';

      expect(() => authAppService.signIn(postAuthAppRequestDto)).toThrow(
        new UnauthorizedException(),
      );
    });

    it('잘못된 패스워드', async () => {
      const postAuthAdminRequestDto = new PostAuthAppRequestDto();
      postAuthAdminRequestDto.email = 'test@test.com';
      postAuthAdminRequestDto.password = 'invalid';

      expect(() => authAppService.signIn(postAuthAdminRequestDto)).toThrow(
        new UnauthorizedException(),
      );
    });

    it('성공', async () => {
      const postAuthAdminRequestDto = new PostAuthAppRequestDto();
      postAuthAdminRequestDto.email = 'test@test.com';
      postAuthAdminRequestDto.password = '1234';

      jest.spyOn(authService, 'createToken').mockReturnValue('mockToken');

      const result = authAppService.signIn(postAuthAdminRequestDto);

      expect(result).toEqual('mockToken');
    });
  });
});
