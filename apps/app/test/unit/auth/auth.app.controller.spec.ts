import { Test } from '@nestjs/testing';
import { AuthAppController } from '../../../src/api/auth/auth.app.controller';
import { AuthAppService } from '../../../src/api/auth/auth.app.service';
import { postAuthAppRequestDtoStub } from '../../../../admin/test/unit/auth/auth.admin.dto.stub';
import { createUserDtoStub } from '../../../../../libs/domain/test/_vo/_stub/create-user.dto.stub';

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
    await authAppController.signIn(postAuthAppRequestDtoStub);

    expect(authAppService.signIn).toBeCalledWith(postAuthAppRequestDtoStub);
  });
});
