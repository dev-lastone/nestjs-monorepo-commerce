import { Test } from '@nestjs/testing';
import { AuthAdminController } from '../auth.admin.controller';
import { AuthAdminService } from '../auth.admin.service';
import { PostAuthAdminRequestDto } from '../auth.admin.dto';
import { adminUserStub } from '@domain/domain/admin-user/__stub/admin-user.stub';

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
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();

    authAdminController = testingModule.get(AuthAdminController);
    authAdminService = testingModule.get(AuthAdminService);
  });

  it('signIn', () => {
    const postAuthAdminRequestDto = new PostAuthAdminRequestDto();
    postAuthAdminRequestDto.email = adminUserStub.email;
    postAuthAdminRequestDto.password = adminUserStub.password;

    authAdminController.signIn(postAuthAdminRequestDto);

    expect(authAdminService.signIn).toBeCalledWith(postAuthAdminRequestDto);
  });
});
