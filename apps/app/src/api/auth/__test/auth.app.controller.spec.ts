import { Test } from '@nestjs/testing';
import { AuthAppController } from '../auth.app.controller';
import { AuthAppService } from '../auth.app.service';
import {
  postAuthAdminSignUpReqDtoStub,
  postAuthAppRequestDtoStub,
} from '../../../../../admin/src/api/auth/__test/auth.admin.dto.stub';

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
    await authAppController.signUp(postAuthAdminSignUpReqDtoStub);

    expect(authAppService.signUp).toBeCalledWith(postAuthAdminSignUpReqDtoStub);
  });

  it('signIn', async () => {
    await authAppController.signIn(postAuthAppRequestDtoStub);

    expect(authAppService.signIn).toBeCalledWith(postAuthAppRequestDtoStub);
  });
});
