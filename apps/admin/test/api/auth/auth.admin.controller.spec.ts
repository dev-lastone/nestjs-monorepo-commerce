import { Test } from '@nestjs/testing';
import { AuthAdminController } from '../../../src/api/auth/auth.admin.controller';
import { AuthAdminService } from '../../../src/api/auth/auth.admin.service';
import { createUserDtoStub } from '../../../../../libs/domain/test/user/stub/dto/create-user.dto.stub';
import { signInUserDtoStub } from '../../../../../libs/domain/test/user/stub/dto/sign-in-user.dto.stub';

describe('AuthAdminController', () => {
  let authAdminController: AuthAdminController;
  let authAdminService: AuthAdminService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [AuthAdminController],
      providers: [
        {
          provide: AuthAdminService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();

    authAdminController = testingModule.get(AuthAdminController);
    authAdminService = testingModule.get(AuthAdminService);
  });

  it('signUp', () => {
    authAdminController.signUp(createUserDtoStub);

    expect(authAdminService.signUp).toBeCalledWith(createUserDtoStub);
  });

  it('signIn', () => {
    authAdminController.signIn(signInUserDtoStub);

    expect(authAdminService.signIn).toBeCalledWith(signInUserDtoStub);
  });
});
