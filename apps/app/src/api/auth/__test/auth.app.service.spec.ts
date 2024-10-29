import { Test } from '@nestjs/testing';
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
import { AuthApplicationService } from '@application/auth/auth.application.service';
import { AppUserRepo } from '@domain/app-user/app-user.repo';
import { SUCCESS } from '@common/constant/constants';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthAppService', () => {
  let authAppService: AuthAppService;
  let appUserRepo: AppUserRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        AuthAppService,
        {
          provide: AuthApplicationService,
          useValue: {
            createToken: jest.fn().mockReturnValue('mockToken'),
          },
        },
        {
          provide: AppUserRepo,
          useValue: {
            save: jest.fn(),
            findOneByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    authAppService = testingModule.get(AuthAppService);
    appUserRepo = testingModule.get(AppUserRepo);
  });

  describe('signUp', () => {
    const postAuthAdminRequestDto = new PostAuthSignUpAppReqDto();
    postAuthAdminRequestDto.name = appUserStub.name;
    postAuthAdminRequestDto.email = appUserStub.email;
    postAuthAdminRequestDto.password = appUserStub.password;

    it(ERROR_MESSAGES.PasswordConfirm, () => {
      postAuthAdminRequestDto.passwordConfirm = invalidAppUserStub.password;

      expect(() =>
        authAppService.signUp(postAuthAdminRequestDto),
      ).rejects.toThrowError(ERROR_MESSAGES.PasswordConfirm);
    });

    it(SUCCESS, async () => {
      postAuthAdminRequestDto.passwordConfirm = appUserStub.password;

      const result = await authAppService.signUp(postAuthAdminRequestDto);

      expect(result).toEqual('mockToken');
    });
  });

  describe('signIn', () => {
    it(ERROR_MESSAGES.InvalidSignIn + ' - email', () => {
      const postAuthAppRequestDto = new PostAuthAppRequestDto();
      postAuthAppRequestDto.email = invalidAppUserStub.email;
      postAuthAppRequestDto.password = appUserStub.password;

      expect(() =>
        authAppService.signIn(postAuthAppRequestDto),
      ).rejects.toThrowError(ERROR_MESSAGES.InvalidSignIn);
    });

    it(ERROR_MESSAGES.InvalidSignIn + ' - password', () => {
      const postAuthAdminRequestDto = new PostAuthAppRequestDto();
      postAuthAdminRequestDto.email = appUserStub.email;
      postAuthAdminRequestDto.password = invalidAppUserStub.password;

      jest.spyOn(appUserRepo, 'findOneByEmail').mockResolvedValue(appUserStub);
      jest
        .spyOn(appUserStub, 'compare')
        .mockRejectedValue(
          new UnauthorizedException(ERROR_MESSAGES.InvalidSignIn),
        );

      expect(() =>
        authAppService.signIn(postAuthAdminRequestDto),
      ).rejects.toThrowError(ERROR_MESSAGES.InvalidSignIn);
    });

    it(SUCCESS, async () => {
      const postAuthAdminRequestDto = new PostAuthAppRequestDto();
      postAuthAdminRequestDto.email = appUserStub.email;
      postAuthAdminRequestDto.password = appUserStub.password;

      jest.spyOn(appUserRepo, 'findOneByEmail').mockResolvedValue(appUserStub);
      jest.spyOn(appUserStub, 'compare').mockResolvedValue();

      const result = await authAppService.signIn(postAuthAdminRequestDto);

      expect(result).toEqual('mockToken');
    });
  });
});
