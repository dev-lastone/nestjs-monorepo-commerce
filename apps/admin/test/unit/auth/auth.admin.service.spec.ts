import { Test, TestingModule } from '@nestjs/testing';
import { AuthApplicationService } from '@application/auth/auth.application.service';
import { AdminUserRepo } from '@application/admin-user/admin-user.repo';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import {
  createUserDtoStub,
  invalidUserSignInDto,
  postAuthAppRequestDtoStub,
} from './auth.admin.dto.stub';
import { AuthAdminService } from '../../../src/api/auth/auth.admin.service';
import { adminUserStub } from '../../../../../libs/domain/test/admin-user/_stub/admin-user.stub';

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

      jest
        .spyOn(authApplicationService, 'createToken')
        .mockReturnValue('mockToken');

      expect(authAdminService.signIn(createUserDtoStub)).resolves.toEqual(
        'mockToken',
      );
    });
  });
});
