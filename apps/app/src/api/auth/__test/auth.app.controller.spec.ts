import { Test } from '@nestjs/testing';
import { AuthAppController } from '../auth.app.controller';
import {
  PostAuthAppRequestDto,
  PostAuthSignUpAppReqDto,
} from '../auth.app.dto';
import { AuthAppService } from '../auth.app.service';

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
    postAuthAppRequestDto.name = 'test';
    postAuthAppRequestDto.email = 'test@test.com';
    postAuthAppRequestDto.password = '1234';

    authAppController.signUp(postAuthAppRequestDto);

    expect(authAppService.signUp).toBeCalledWith(postAuthAppRequestDto);
  });

  it('signIn', () => {
    const postAuthAppRequestDto = new PostAuthAppRequestDto();
    postAuthAppRequestDto.email = 'test@test.com';
    postAuthAppRequestDto.password = '1234';

    authAppController.signIn(postAuthAppRequestDto);

    expect(authAppService.signIn).toBeCalledWith(postAuthAppRequestDto);
  });
});
