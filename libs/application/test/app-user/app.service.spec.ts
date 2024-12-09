import { Test, TestingModule } from '@nestjs/testing';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { createUserDtoStub } from '../../../domain/test/_vo/_stub/create-user.dto.stub';
import { SUCCESS } from '@common/constant/constants';
import { AppUserService } from '@application/app-user/app-user.service';
import { AppUserRepo } from '@application/app-user/app-user.repo';
import { signInUserDtoStub } from '../../../domain/test/_vo/_stub/sign-in-user.dto.stub';
import { userStub } from '../../../domain/test/_vo/_stub/user.stub';
import { appUserStub } from '../../../domain/test/app-user/_stub/app-user.stub';

describe('AppUserService', () => {
  let appUserService: AppUserService;
  let appUserRepo: AppUserRepo;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppUserService,
        {
          provide: AppUserRepo,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    appUserService = app.get(AppUserService);
    appUserRepo = app.get(AppUserRepo);
  });

  it('signUp', async () => {
    jest.spyOn(appUserService, 'signUp').mockResolvedValue(appUserStub);

    await appUserService.signUp(createUserDtoStub);

    expect(appUserService.signUp).toBeCalledWith(createUserDtoStub);
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
          password: 'invalidPassword',
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
