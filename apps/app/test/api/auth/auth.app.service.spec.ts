import { Test } from '@nestjs/testing';
import { AuthService } from '@application/auth/auth.service';
import { AuthAppService } from '../../../src/api/auth/auth.app.service';
import { AppUserService } from '@application/app-user/app-user.service';
import { appUserStub } from '../../../../../libs/domain/test/app-user/_stub/app-user.stub';
import { createUserDtoStub } from '../../../../../libs/domain/test/user/stub/dto/create-user.dto.stub';
import { userStub } from '../../../../../libs/domain/test/user/stub/user.stub';
import { signInUserDtoStub } from '../../../../../libs/domain/test/user/stub/dto/sign-in-user.dto.stub';

describe('AuthAppService', () => {
  let authAppService: AuthAppService;
  let authService: AuthService;
  let appUserService: AppUserService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        AuthAppService,
        {
          provide: AuthService,
          useValue: {
            createToken: jest.fn(),
          },
        },
        {
          provide: AppUserService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();

    authAppService = testingModule.get(AuthAppService);
    authService = testingModule.get(AuthService);
    appUserService = testingModule.get(AppUserService);
  });

  it('signUp', async () => {
    jest.spyOn(appUserService, 'signUp').mockResolvedValue(appUserStub);

    await authAppService.signUp(createUserDtoStub);

    expect(appUserService.signUp).toBeCalledWith(createUserDtoStub);
    expect(authService.createToken).toBeCalledWith(userStub);
  });

  it('signIn', async () => {
    jest.spyOn(appUserService, 'signIn').mockResolvedValue(appUserStub);

    await authAppService.signIn(signInUserDtoStub);

    expect(appUserService.signIn).toBeCalledWith(signInUserDtoStub);
    expect(authService.createToken).toBeCalledWith(userStub);
  });
});
