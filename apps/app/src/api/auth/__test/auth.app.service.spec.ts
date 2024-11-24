import { Test } from '@nestjs/testing';
import { AuthAppService } from '../auth.app.service';
import { PostAuthAppRequestDto } from '../auth.app.dto';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import {
  appUserStub,
  invalidAppUserStub,
} from '@domain/app-user/__stub/app-user.stub';
import { AuthApplicationService } from '@application/auth/auth.application.service';
import { AppUserRepo } from '@domain/app-user/app-user.repo';
import { SUCCESS } from '@common/constant/constants';
import { UnauthorizedException } from '@nestjs/common';
import {
  invalidUserSignInDto,
  postAuthAdminSignUpReqDtoStub,
  postAuthAppRequestDtoStub,
} from '../../../../../admin/src/api/auth/__test/auth.admin.dto.stub';

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
    it(ERROR_MESSAGES.DuplicateEmail, () => {
      jest.spyOn(appUserRepo, 'findOneByEmail').mockResolvedValue(appUserStub);

      expect(() =>
        authAppService.signUp(postAuthAdminSignUpReqDtoStub),
      ).rejects.toThrowError(ERROR_MESSAGES.DuplicateEmail);
    });

    it(SUCCESS, async () => {
      const result = await authAppService.signUp(postAuthAdminSignUpReqDtoStub);

      expect(result).toEqual('mockToken');
    });
  });

  describe('signIn', () => {
    it(ERROR_MESSAGES.InvalidSignIn + ' - email', () => {
      const postAuthAppRequestDto = new PostAuthAppRequestDto();
      postAuthAppRequestDto.email = invalidAppUserStub.email;
      postAuthAppRequestDto.password = postAuthAppRequestDtoStub.password;

      expect(() =>
        authAppService.signIn(postAuthAppRequestDto),
      ).rejects.toThrowError(ERROR_MESSAGES.InvalidSignIn);
    });

    it(ERROR_MESSAGES.InvalidSignIn + ' - password', () => {
      const postAuthAdminRequestDto = new PostAuthAppRequestDto();
      postAuthAdminRequestDto.email = postAuthAppRequestDtoStub.email;
      postAuthAdminRequestDto.password = invalidUserSignInDto.password;

      jest.spyOn(appUserRepo, 'findOneByEmail').mockResolvedValue(appUserStub);
      jest
        .spyOn(appUserStub.user.password, 'compare')
        .mockRejectedValue(
          new UnauthorizedException(ERROR_MESSAGES.InvalidSignIn),
        );

      expect(() =>
        authAppService.signIn(postAuthAdminRequestDto),
      ).rejects.toThrowError(ERROR_MESSAGES.InvalidSignIn);
    });

    it(SUCCESS, async () => {
      jest.spyOn(appUserRepo, 'findOneByEmail').mockResolvedValue(appUserStub);
      jest.spyOn(appUserStub.user.password, 'compare').mockResolvedValue();

      const result = await authAppService.signIn(postAuthAppRequestDtoStub);

      expect(result).toEqual('mockToken');
    });
  });
});
