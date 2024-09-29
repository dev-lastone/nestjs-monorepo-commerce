import { Test, TestingModule } from '@nestjs/testing';
import { AuthAppController } from '../auth.app.controller';
import {
  PostAuthAppRequestDto,
  PostAuthSignUpAppReqDto,
} from '../auth.app.dto';
import { AuthAppService } from '../auth.app.service';

describe('AuthAppController', () => {
  let authAppController: AuthAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
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

    authAppController = app.get<AuthAppController>(AuthAppController);
  });

  it('signUp', async () => {
    const postAuthAppRequestDto = new PostAuthSignUpAppReqDto();
    postAuthAppRequestDto.name = 'test';
    postAuthAppRequestDto.email = 'test@test.com';
    postAuthAppRequestDto.password = '1234';

    await expect(
      authAppController.signUp(postAuthAppRequestDto),
    ).resolves.toEqual('mockToken');
  });

  it('signIn', async () => {
    const postAuthAppRequestDto = new PostAuthAppRequestDto();
    postAuthAppRequestDto.email = 'test@test.com';
    postAuthAppRequestDto.password = '1234';

    await expect(
      authAppController.signIn(postAuthAppRequestDto),
    ).resolves.toEqual('mockToken');
  });
});
