import { Test } from '@nestjs/testing';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { AuthService } from '@application/auth/auth.service';
import { AppUserRepo } from '@application/app-user/app-user.repo';
import { SUCCESS } from '@common/constant/constants';
import { UnauthorizedException } from '@nestjs/common';
import { AuthAppService } from '../../../src/api/auth/auth.app.service';
import {
  invalidUserSignInDto,
  postAuthAppRequestDtoStub,
} from '../../../../admin/test/unit/auth/auth.admin.dto.stub';
import { PostAuthAppRequestDto } from '../../../src/api/auth/auth.app.dto';
import {
  appUserStub,
  invalidAppUserStub,
} from '../../../../../libs/domain/test/app-user/_stub/app-user.stub';
import { createUserDtoStub } from '../../../../../libs/domain/test/_vo/_stub/create-user.dto.stub';

describe('AuthAppService', () => {
  let authAppService: AuthAppService;
  let appUserRepo: AppUserRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        AuthAppService,
        {
          provide: AuthService,
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
        authAppService.signUp(createUserDtoStub),
      ).rejects.toThrowError(ERROR_MESSAGES.DuplicateEmail);
    });

    it(SUCCESS, async () => {
      const result = await authAppService.signUp(createUserDtoStub);

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
