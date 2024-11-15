import { Test } from '@nestjs/testing';
import { AuthAppController } from '../auth.app.controller';
import {
  PostAuthAppRequestDto,
  PostAuthSignUpAppReqDto,
} from '../auth.app.dto';
import { AuthAppService } from '../auth.app.service';
import { UserName } from '@domain/_vo/user-name';
import { Email } from '@domain/_vo/email';
import { UserPassword } from '@domain/_vo/user-password';

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

  it('signUp', () => {
    const postAuthAppRequestDto = new PostAuthSignUpAppReqDto();
    postAuthAppRequestDto.name = UserName.create('test');
    postAuthAppRequestDto.email = Email.create('test@test.com');
    postAuthAppRequestDto.password = new UserPassword('1234');

    authAppController.signUp(postAuthAppRequestDto);

    expect(authAppService.signUp).toBeCalledWith(postAuthAppRequestDto);
  });

  it('signIn', () => {
    const postAuthAppRequestDto = new PostAuthAppRequestDto();
    postAuthAppRequestDto.email = Email.create('test@test.com');
    postAuthAppRequestDto.password = new UserPassword('1234');

    authAppController.signIn(postAuthAppRequestDto);

    expect(authAppService.signIn).toBeCalledWith(postAuthAppRequestDto);
  });
});
