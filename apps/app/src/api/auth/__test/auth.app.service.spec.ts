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
import { AuthApplicationService } from '@application/auth/auth.application.service';
import { AppUserRepo } from '@domain/app-user/app-user.repo';

describe('AuthAppService', () => {
  let authAppService: AuthAppService;
  let authApplicationService: AuthApplicationService;
  let appUserRepo: AppUserRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        AuthAppService,
        {
          provide: AuthApplicationService,
          useValue: {
            createToken: jest.fn(),
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
    authApplicationService = testingModule.get(AuthApplicationService);
    appUserRepo = testingModule.get(AppUserRepo);
  });

  describe('signUp', () => {
    it(ERROR_MESSAGES.PasswordConfirm, async () => {
      const postAuthAdminRequestDto = new PostAuthSignUpAppReqDto();
      postAuthAdminRequestDto.name = appUserStub.name;
      postAuthAdminRequestDto.email = appUserStub.email;
      postAuthAdminRequestDto.password = appUserStub.password;
      postAuthAdminRequestDto.passwordConfirm = invalidAppUserStub.password;

      expect(
        async () => await authAppService.signUp(postAuthAdminRequestDto),
      ).rejects.toThrowError(ERROR_MESSAGES.PasswordConfirm);
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

      const result = await authAppService.signUp(postAuthAdminRequestDto);

      expect(result).toEqual('mockToken');
    });
  });

  describe('signIn', () => {
    it('잘못된 이메일', async () => {
      const postAuthAppRequestDto = new PostAuthAppRequestDto();
      postAuthAppRequestDto.email = invalidAppUserStub.email;
      postAuthAppRequestDto.password = appUserStub.password;

      expect(
        async () => await authAppService.signIn(postAuthAppRequestDto),
      ).rejects.toThrowError(new UnauthorizedException());
    });

    it('잘못된 패스워드', async () => {
      const postAuthAdminRequestDto = new PostAuthAppRequestDto();
      postAuthAdminRequestDto.email = appUserStub.email;
      postAuthAdminRequestDto.password = invalidAppUserStub.password;

      expect(
        async () => await authAppService.signIn(postAuthAdminRequestDto),
      ).rejects.toThrowError(new UnauthorizedException());
    });

    it('성공', async () => {
      const postAuthAdminRequestDto = new PostAuthAppRequestDto();
      postAuthAdminRequestDto.email = appUserStub.email;
      postAuthAdminRequestDto.password = appUserStub.password;

      jest.spyOn(appUserRepo, 'findOneByEmail').mockResolvedValue(appUserStub);

      jest
        .spyOn(authApplicationService, 'createToken')
        .mockReturnValue('mockToken');

      const result = await authAppService.signIn(postAuthAdminRequestDto);

      expect(result).toEqual('mockToken');
    });
  });
});
