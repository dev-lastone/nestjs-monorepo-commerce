import { Test } from '@nestjs/testing';
import { AuthAdminController } from '../auth.admin.controller';
import { AuthAdminService } from '../auth.admin.service';
import {
  PostAuthAdminRequestDto,
  PostAuthAdminSignUpReqDto,
} from '../auth.admin.dto';
import { adminUserStub } from '@domain/admin-user/__stub/admin-user.stub';

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
    const dto = new PostAuthAdminSignUpReqDto();
    dto.name = 'test';
    dto.email = 'test@test.com';
    dto.password = 'string1234';

    await authAdminController.signUp(dto);

    expect(authAdminService.signUp).toBeCalledWith(dto);
  });

  it('signIn', () => {
    const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
    postAuthAdminRequestDto.email = adminUserStub.email;
    postAuthAdminRequestDto.password = 'string1234';

    authAdminController.signIn(postAuthAdminRequestDto);

    expect(authAdminService.signIn).toBeCalledWith(postAuthAdminRequestDto);
  });
});
