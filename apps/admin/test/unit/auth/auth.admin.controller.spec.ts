import { Test } from '@nestjs/testing';
import { postAuthAppRequestDtoStub } from './auth.admin.dto.stub';
import { AuthAdminController } from '../../../src/api/auth/auth.admin.controller';
import { AuthAdminService } from '../../../src/api/auth/auth.admin.service';
import { createUserDtoStub } from '../../../../../libs/domain/test/_vo/_stub/create-user.dto.stub';

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
            signUp: jest.fn().mockResolvedValue('mockToken'),
            signIn: jest.fn().mockResolvedValue('mockToken'),
          },
        },
      ],
    }).compile();

    authAdminController = testingModule.get(AuthAdminController);
    authAdminService = testingModule.get(AuthAdminService);
  });

  it('signUp', async () => {
    await authAdminController.signUp(createUserDtoStub);

    expect(authAdminService.signUp).toBeCalledWith(createUserDtoStub);
  });

  it('signIn', () => {
    authAdminController.signIn(postAuthAppRequestDtoStub);

    expect(authAdminService.signIn).toBeCalledWith(postAuthAppRequestDtoStub);
  });
});
