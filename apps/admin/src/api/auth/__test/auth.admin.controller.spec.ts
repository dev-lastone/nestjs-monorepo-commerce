import { Test } from '@nestjs/testing';
import { AuthAdminController } from '../auth.admin.controller';
import { AuthAdminService } from '../auth.admin.service';
import {
  postAuthAdminSignUpReqDtoStub,
  postAuthAppRequestDto,
} from './auth.admin.dto.stub';

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
    await authAdminController.signUp(postAuthAdminSignUpReqDtoStub);

    expect(authAdminService.signUp).toBeCalledWith(
      postAuthAdminSignUpReqDtoStub,
    );
  });

  it('signIn', () => {
    authAdminController.signIn(postAuthAppRequestDto);

    expect(authAdminService.signIn).toBeCalledWith(postAuthAppRequestDto);
  });
});
