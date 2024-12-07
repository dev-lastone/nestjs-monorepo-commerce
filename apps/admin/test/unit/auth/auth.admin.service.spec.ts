import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@application/auth/auth.service';
import { AuthAdminService } from '../../../src/api/auth/auth.admin.service';
import { adminUserStub } from '../../../../../libs/domain/test/admin-user/_stub/admin-user.stub';
import { createUserDtoStub } from '../../../../../libs/domain/test/_vo/_stub/create-user.dto.stub';
import { AdminUserService } from '@application/admin-user/admin-user.service';
import { signInUserDtoStub } from '../../../../../libs/domain/test/_vo/_stub/sign-in-user.dto.stub';

describe('AuthAdminService', () => {
  let authAdminService: AuthAdminService;
  let authService: AuthService;
  let adminUserService: AdminUserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
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

    authAdminService = app.get(AuthAdminService);
    authService = app.get(AuthService);
    adminUserService = app.get(AdminUserService);
  });

  it('signUp', async () => {
    jest.spyOn(adminUserService, 'signUp').mockResolvedValue(adminUserStub);

    await authAdminService.signUp(createUserDtoStub);

    expect(adminUserService.signUp).toBeCalledWith(createUserDtoStub);
    expect(authService.createToken).toBeCalledWith(adminUserStub);
  });

  it('signIn', async () => {
    jest.spyOn(adminUserService, 'signIn').mockResolvedValue(adminUserStub);

    await authAdminService.signIn(signInUserDtoStub);

    expect(adminUserService.signIn).toBeCalledWith(signInUserDtoStub);
    expect(authService.createToken).toBeCalledWith(adminUserStub);
  });
});
