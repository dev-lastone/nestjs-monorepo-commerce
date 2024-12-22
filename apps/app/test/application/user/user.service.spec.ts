import { Test } from '@nestjs/testing';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { SUCCESS } from '@common/constant/constants';
import { UserService } from '../../../src/application/user/user.service';
import { UserRepo } from '../../../src/application/user/user.repo';
import { appUserStub } from '../../../../../libs/domain/test/app-user/_stub/app-user.stub';
import { createUserDtoStub } from '../../../../../libs/domain/test/user/stub/dto/create-user.dto.stub';
import { signInUserDtoStub } from '../../../../../libs/domain/test/user/stub/dto/sign-in-user.dto.stub';
import { userStub } from '../../../../../libs/domain/test/user/stub/user.stub';
import { invalidPasswordStub } from '../../../../../libs/domain/test/_vo/_stub/user-password.stub';
import { AppUser } from '@domain/app-user/app-user.entity';

describe('AppUserService', () => {
  let appUserService: UserService;
  let appUserRepo: UserRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepo,
          useValue: {
            save: jest.fn(),
            findOneByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    appUserService = testingModule.get(UserService);
    appUserRepo = testingModule.get(UserRepo);
  });

  describe('signUp', () => {
    it(ERROR_MESSAGES.DuplicateEmail, async () => {
      jest.spyOn(appUserRepo, 'findOneByEmail').mockResolvedValue(appUserStub);

      await expect(appUserService.signUp(createUserDtoStub)).rejects.toThrow(
        ERROR_MESSAGES.DuplicateEmail,
      );
    });

    it(SUCCESS, async () => {
      jest.spyOn(appUserRepo, 'findOneByEmail').mockResolvedValue(null);
      jest.spyOn(appUserRepo, 'save').mockResolvedValue({} as AppUser);
      await expect(appUserService.signUp(createUserDtoStub)).resolves.toEqual(
        {},
      );
    });
  });

  describe('signIn', () => {
    it(ERROR_MESSAGES.InvalidSignIn + ' - email', () => {
      expect(() =>
        appUserService.signIn({
          email: 'invalid@email.com',
          password: signInUserDtoStub.password,
        }),
      ).rejects.toThrow(ERROR_MESSAGES.InvalidSignIn);
    });

    it(ERROR_MESSAGES.InvalidSignIn + ' - password', () => {
      expect(() =>
        appUserService.signIn({
          email: userStub.email,
          password: invalidPasswordStub,
        }),
      ).rejects.toThrow(ERROR_MESSAGES.InvalidSignIn);
    });

    it(SUCCESS, async () => {
      jest.spyOn(appUserRepo, 'findOneByEmail').mockResolvedValue(appUserStub);
      jest.spyOn(userStub.password, 'compare').mockResolvedValue();

      await appUserService.signIn(signInUserDtoStub);

      expect(appUserRepo.findOneByEmail).toBeCalledWith(
        signInUserDtoStub.email,
      );
      expect(userStub.password.compare).toBeCalledWith(
        signInUserDtoStub.password,
      );
    });
  });
});
