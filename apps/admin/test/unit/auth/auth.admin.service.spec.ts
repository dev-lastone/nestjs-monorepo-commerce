import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@application/auth/auth.service';
import { AdminUserRepo } from '@application/admin-user/admin-user.repo';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import {
  invalidUserSignInDto,
  postAuthAppRequestDtoStub,
} from './auth.admin.dto.stub';
import { AuthAdminService } from '../../../src/api/auth/auth.admin.service';
import { adminUserStub } from '../../../../../libs/domain/test/admin-user/_stub/admin-user.stub';
import { createUserDtoStub } from '../../../../../libs/domain/test/_vo/_stub/create-user.dto.stub';

describe('AuthAdminService', () => {
  let authAdminService: AuthAdminService;
  let authService: AuthService;
  let adminUserRepo: AdminUserRepo;

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
          provide: AdminUserRepo,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    authAdminService = app.get(AuthAdminService);
    authService = app.get(AuthService);
    adminUserRepo = app.get(AdminUserRepo);
  });

  describe('signIn', () => {
    it(ERROR_MESSAGES.InvalidSignIn + ' - email', () => {
      expect(() =>
        authAdminService.signIn({
          email: invalidUserSignInDto.email,
          password: postAuthAppRequestDtoStub.password,
        }),
      ).rejects.toThrow(ERROR_MESSAGES.InvalidSignIn);
    });

    it(ERROR_MESSAGES.InvalidSignIn + ' - password', () => {
      expect(() =>
        authAdminService.signIn({
          email: adminUserStub.user.email,
          password: invalidUserSignInDto.password,
        }),
      ).rejects.toThrow(ERROR_MESSAGES.InvalidSignIn);
    });

    it('201', () => {
      jest
        .spyOn(adminUserRepo, 'findOneByEmail')
        .mockResolvedValue(adminUserStub);

      jest.spyOn(authService, 'createToken').mockReturnValue('mockToken');

      expect(authAdminService.signIn(createUserDtoStub)).resolves.toEqual(
        'mockToken',
      );
    });
  });
});
