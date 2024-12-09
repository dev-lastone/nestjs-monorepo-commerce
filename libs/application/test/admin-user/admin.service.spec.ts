import { Test } from '@nestjs/testing';
import { AdminUserRepo } from '@application/admin-user/admin-user.repo';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { AdminUserService } from '@application/admin-user/admin-user.service';
import { createUserDtoStub } from '../../../domain/test/_vo/_stub/create-user.dto.stub';
import { SUCCESS } from '@common/constant/constants';
import { signInUserDtoStub } from '../../../domain/test/_vo/_stub/sign-in-user.dto.stub';
import { userStub } from '../../../domain/test/_vo/_stub/user.stub';

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
    jest.spyOn(adminUserService, 'signUp').mockResolvedValue(userStub);

    await adminUserService.signUp(createUserDtoStub);

    expect(adminUserService.signUp).toBeCalledWith(createUserDtoStub);
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
          password: 'invalidPassword',
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
