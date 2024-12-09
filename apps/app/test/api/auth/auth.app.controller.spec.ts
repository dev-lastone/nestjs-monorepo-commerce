import { Test } from '@nestjs/testing';
import { AuthAppController } from '../../../src/api/auth/auth.app.controller';
import { AuthAppService } from '../../../src/api/auth/auth.app.service';
import { createUserDtoStub } from '../../../../../libs/domain/test/user/stub/dto/create-user.dto.stub';
import { signInUserDtoStub } from '../../../../../libs/domain/test/user/stub/dto/sign-in-user.dto.stub';

describe('AuthAppController', () => {
  let authAppController: AuthAppController;
  let authAppService: AuthAppService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [AuthAppController],
      providers: [
        {
          provide: AuthAppService,
          useValue: {
            signUp: jest.fn().mockResolvedValue('mockToken'),
            signIn: jest.fn().mockResolvedValue('mockToken'),
          },
        },
      ],
    }).compile();

    authAppController = testingModule.get(AuthAppController);
    authAppService = testingModule.get(AuthAppService);
  });

  it('signUp', async () => {
    await authAppController.signUp(createUserDtoStub);

    expect(authAppService.signUp).toBeCalledWith(createUserDtoStub);
  });

  it('signIn', async () => {
    await authAppController.signIn(signInUserDtoStub);

    expect(authAppService.signIn).toBeCalledWith(signInUserDtoStub);
  });
});
