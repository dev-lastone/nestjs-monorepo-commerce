import { Test } from '@nestjs/testing';
import { AdminUserRepo } from '@application/admin-user/admin-user.repo';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { AdminUserService } from '@application/admin-user/admin-user.service';
import { adminUserStub } from '../../../domain/test/admin-user/_stub/admin-user.stub';
import { createUserDtoStub } from '../../../domain/test/_vo/_stub/create-user.dto.stub';
import { postAuthAppRequestDtoStub } from '../../../../apps/admin/test/unit/auth/auth.admin.dto.stub';
import { SUCCESS } from '@common/constant/constants';

describe('AdminUserService', () => {
  let adminUserService: AdminUserService;
  let adminUserRepo: AdminUserRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        AdminUserService,
        {
          provide: AdminUserRepo,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    adminUserService = testingModule.get(AdminUserService);
    adminUserRepo = testingModule.get(AdminUserRepo);
  });

  it('signUp', async () => {
    jest.spyOn(adminUserService, 'signUp').mockResolvedValue(adminUserStub);

    await adminUserService.signUp(createUserDtoStub);

    expect(adminUserService.signUp).toBeCalledWith(createUserDtoStub);
  });

  describe('signIn', () => {
    it(ERROR_MESSAGES.InvalidSignIn + ' - email', () => {
      expect(() =>
        adminUserService.signIn({
          email: 'invalid@email.com',
          password: postAuthAppRequestDtoStub.password,
        }),
      ).rejects.toThrow(ERROR_MESSAGES.InvalidSignIn);
    });

    it(ERROR_MESSAGES.InvalidSignIn + ' - password', () => {
      expect(() =>
        adminUserService.signIn({
          email: adminUserStub.user.email,
          password: 'invalidPassword',
        }),
      ).rejects.toThrow(ERROR_MESSAGES.InvalidSignIn);
    });

    it(SUCCESS, async () => {
      jest
        .spyOn(adminUserRepo, 'findOneByEmail')
        .mockResolvedValue(adminUserStub);
      jest.spyOn(adminUserStub.user.password, 'compare').mockResolvedValue();

      await adminUserService.signIn(postAuthAppRequestDtoStub);

      expect(adminUserRepo.findOneByEmail).toBeCalledWith(
        postAuthAppRequestDtoStub.email,
      );
      expect(adminUserStub.user.password.compare).toBeCalledWith(
        postAuthAppRequestDtoStub.password,
      );
    });
  });
});
