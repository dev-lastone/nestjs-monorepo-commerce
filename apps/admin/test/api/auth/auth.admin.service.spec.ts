import { Test } from '@nestjs/testing';
import { AuthService } from '@application/auth/auth.service';
import { AuthAdminService } from '../../../src/api/auth/auth.admin.service';
import { userStub } from '../../../../../libs/domain/test/user/stub/user.stub';
import { createUserDtoStub } from '../../../../../libs/domain/test/user/stub/dto/create-user.dto.stub';
import { signInUserDtoStub } from '../../../../../libs/domain/test/user/stub/dto/sign-in-user.dto.stub';
import { AdminUserService } from '../../../src/application/admin-user/admin-user.service';

describe('AuthAdminService', () => {
  let authAdminService: AuthAdminService;
  let authService: AuthService;
  let adminUserService: AdminUserService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        AuthAdminService,
        {
          provide: AuthService,
          useValue: {
            createToken: jest.fn(),
          },
        },
        {
          provide: AdminUserService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();

    authAdminService = testingModule.get(AuthAdminService);
    authService = testingModule.get(AuthService);
    adminUserService = testingModule.get(AdminUserService);
  });

  it('signUp', async () => {
    jest.spyOn(adminUserService, 'signUp').mockResolvedValue(userStub);

    await authAdminService.signUp(createUserDtoStub);

    expect(adminUserService.signUp).toBeCalledWith(createUserDtoStub);
    expect(authService.createToken).toBeCalledWith(userStub);
  });

  it('signIn', async () => {
    jest.spyOn(adminUserService, 'signIn').mockResolvedValue(userStub);

    await authAdminService.signIn(signInUserDtoStub);

    expect(adminUserService.signIn).toBeCalledWith(signInUserDtoStub);
    expect(authService.createToken).toBeCalledWith(userStub);
  });
});
