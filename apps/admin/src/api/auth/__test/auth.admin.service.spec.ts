import { Test, TestingModule } from '@nestjs/testing';
import { AuthAdminService } from '../auth.admin.service';
import {
  adminUserStub,
  invalidAdminUserStub,
} from '@domain/admin-user/__stub/admin-user.stub';
import { AuthApplicationService } from '@application/auth/auth.application.service';
import { AdminUserRepo } from '@domain/admin-user/admin-user.repo';
import { ERROR_MESSAGES } from '@common/constant/error-messages';

describe('AuthAdminService', () => {
  let authAdminService: AuthAdminService;
  let authApplicationService: AuthApplicationService;
  let adminUserRepo: AdminUserRepo;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AuthAdminService,
        {
          provide: AuthApplicationService,
          useValue: {
            createToken: jest.fn(),
          },
        },
        {
          provide: AdminUserRepo,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    authAdminService = app.get(AuthAdminService);
    authApplicationService = app.get(AuthApplicationService);
    adminUserRepo = app.get(AdminUserRepo);
  });

  describe('signIn', () => {
    it(ERROR_MESSAGES.InvalidSignIn + ' - email', () => {
      expect(() =>
        authAdminService.signIn({
          email: invalidAdminUserStub.email,
          password: adminUserStub.password,
        }),
      ).rejects.toThrow(ERROR_MESSAGES.InvalidSignIn);
    });

    it(ERROR_MESSAGES.InvalidSignIn + ' - password', () => {
      expect(() =>
        authAdminService.signIn({
          email: adminUserStub.email,
          password: invalidAdminUserStub.password,
        }),
      ).rejects.toThrow(ERROR_MESSAGES.InvalidSignIn);
    });

    it('201', () => {
      jest
        .spyOn(adminUserRepo, 'findOneByEmail')
        .mockResolvedValue(adminUserStub);

      jest
        .spyOn(authApplicationService, 'createToken')
        .mockReturnValue('mockToken');

      expect(
        authAdminService.signIn({
          email: adminUserStub.email,
          password: adminUserStub.password,
        }),
      ).resolves.toEqual('mockToken');
    });
  });
});
