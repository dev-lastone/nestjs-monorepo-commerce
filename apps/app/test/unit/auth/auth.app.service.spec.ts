import { Test } from '@nestjs/testing';
import { AuthService } from '@application/auth/auth.service';
import { AuthAppService } from '../../../src/api/auth/auth.app.service';
import { createUserDtoStub } from '../../../../../libs/domain/test/_vo/_stub/create-user.dto.stub';
import { AppUserService } from '@application/app-user/app-user.service';
import { PostAuthAdminRequestDto } from '../../../../admin/src/api/auth/auth.admin.dto';
import { appUserStub } from '../../../../../libs/domain/test/app-user/_stub/app-user.stub';

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
    expect(authService.createToken).toBeCalledWith(appUserStub);
  });

  it('signIn', async () => {
    jest.spyOn(appUserService, 'signIn').mockResolvedValue(appUserStub);

    const dto: PostAuthAdminRequestDto = {
      email: createUserDtoStub.email,
      password: createUserDtoStub.password,
    };

    await authAppService.signIn(dto);

    expect(appUserService.signIn).toBeCalledWith(dto);
    expect(authService.createToken).toBeCalledWith(appUserStub);
  });
});
