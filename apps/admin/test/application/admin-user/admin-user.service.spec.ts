import { Test } from '@nestjs/testing';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { SUCCESS } from '@common/constant/constants';
import { AdminUserService } from '../../../src/application/admin-user/admin-user.service';
import { AdminUserRepo } from '../../../src/application/admin-user/admin-user.repo';
import { userStub } from '../../../../../libs/domain/test/user/stub/user.stub';
import { createUserDtoStub } from '../../../../../libs/domain/test/user/stub/dto/create-user.dto.stub';
import { signInUserDtoStub } from '../../../../../libs/domain/test/user/stub/dto/sign-in-user.dto.stub';
import { invalidPasswordStub } from '../../../../../libs/domain/test/_vo/_stub/user-password.stub';
import { AdminUser } from '../../../src/domain/admin-user/admin-user.entity';

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
            save: jest.fn(),
            findOneByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    adminUserService = testingModule.get(AdminUserService);
    adminUserRepo = testingModule.get(AdminUserRepo);
  });

  describe('signUp', () => {
    it(ERROR_MESSAGES.DuplicateEmail, () => {
      jest.spyOn(adminUserRepo, 'findOneByEmail').mockResolvedValue(userStub);

      expect(adminUserService.signUp(createUserDtoStub)).rejects.toThrow(
        ERROR_MESSAGES.DuplicateEmail,
      );
    });

    it(SUCCESS, async () => {
      jest.spyOn(adminUserRepo, 'findOneByEmail').mockResolvedValue(null);
      jest.spyOn(adminUserRepo, 'save').mockResolvedValue({} as AdminUser);
      await expect(adminUserService.signUp(createUserDtoStub)).resolves.toEqual(
        {},
      );
    });
  });

  describe('signIn', () => {
    it(ERROR_MESSAGES.InvalidSignIn + ' - email', () => {
      expect(() =>
        adminUserService.signIn({
          email: 'invalid@email.com',
          password: signInUserDtoStub.password,
        }),
      ).rejects.toThrow(ERROR_MESSAGES.InvalidSignIn);
    });

    it(ERROR_MESSAGES.InvalidSignIn + ' - password', () => {
      expect(() =>
        adminUserService.signIn({
          email: userStub.email,
          password: invalidPasswordStub,
        }),
      ).rejects.toThrow(ERROR_MESSAGES.InvalidSignIn);
    });

    it(SUCCESS, async () => {
      jest.spyOn(adminUserRepo, 'findOneByEmail').mockResolvedValue(userStub);
      jest.spyOn(userStub.password, 'compare').mockResolvedValue();

      await adminUserService.signIn(signInUserDtoStub);

      expect(adminUserRepo.findOneByEmail).toBeCalledWith(
        signInUserDtoStub.email,
      );
      expect(userStub.password.compare).toBeCalledWith(
        signInUserDtoStub.password,
      );
    });
  });
});
