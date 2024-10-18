import { Test } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthAppService } from '../auth.app.service';
import {
  PostAuthAppRequestDto,
  PostAuthSignUpAppReqDto,
} from '../auth.app.dto';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import {
  appUserStub,
  invalidAppUserStub,
} from '@domain/app-user/__stub/app-user.stub';
import { AppUserRepo } from '@domain/app-user/app-user.repo';
import { AuthApplicationService } from '@application/auth/auth.application.service';

describe('AuthAppService', () => {
  let authAppService: AuthAppService;
  let authApplicationService: AuthApplicationService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        AuthAppService,
        AppUserRepo,
        {
          provide: AuthApplicationService,
          useValue: {
            createToken: jest.fn(),
          },
        },
      ],
    }).compile();

    authAppService = testingModule.get(AuthAppService);
    authApplicationService = testingModule.get(AuthApplicationService);
  });

  describe('signUp', () => {
    it(ERROR_MESSAGES.PasswordConfirm, async () => {
      const postAuthAdminRequestDto = new PostAuthSignUpAppReqDto();
      postAuthAdminRequestDto.name = appUserStub.name;
      postAuthAdminRequestDto.email = appUserStub.email;
      postAuthAdminRequestDto.password = appUserStub.password;
      postAuthAdminRequestDto.passwordConfirm = invalidAppUserStub.password;

      expect(() => authAppService.signUp(postAuthAdminRequestDto)).toThrow(
        ERROR_MESSAGES.PasswordConfirm,
      );
    });

    it('성공', async () => {
      const postAuthAdminRequestDto = new PostAuthSignUpAppReqDto();
      postAuthAdminRequestDto.name = appUserStub.name;
      postAuthAdminRequestDto.email = appUserStub.email;
      postAuthAdminRequestDto.password = appUserStub.password;
      postAuthAdminRequestDto.passwordConfirm = appUserStub.password;

      jest
        .spyOn(authApplicationService, 'createToken')
        .mockReturnValue('mockToken');

      const result = authAppService.signUp(postAuthAdminRequestDto);

      expect(result).toEqual('mockToken');
    });
  });

  describe('signIn', () => {
    it('잘못된 이메일', async () => {
      const postAuthAppRequestDto = new PostAuthAppRequestDto();
      postAuthAppRequestDto.email = invalidAppUserStub.email;
      postAuthAppRequestDto.password = appUserStub.password;

      expect(() => authAppService.signIn(postAuthAppRequestDto)).toThrow(
        new UnauthorizedException(),
      );
    });

    it('잘못된 패스워드', async () => {
      const postAuthAdminRequestDto = new PostAuthAppRequestDto();
      postAuthAdminRequestDto.email = appUserStub.email;
      postAuthAdminRequestDto.password = invalidAppUserStub.password;

      expect(() => authAppService.signIn(postAuthAdminRequestDto)).toThrow(
        new UnauthorizedException(),
      );
    });

    it('성공', async () => {
      const postAuthAdminRequestDto = new PostAuthAppRequestDto();
      postAuthAdminRequestDto.email = appUserStub.email;
      postAuthAdminRequestDto.password = appUserStub.password;

      jest
        .spyOn(authApplicationService, 'createToken')
        .mockReturnValue('mockToken');

      const result = authAppService.signIn(postAuthAdminRequestDto);

      expect(result).toEqual('mockToken');
    });
  });
});
