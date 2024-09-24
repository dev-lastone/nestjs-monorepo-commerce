import { Test, TestingModule } from '@nestjs/testing';
import { AuthAppController } from '../auth.app.controller';
import { PostAuthAppRequestDto } from '../auth.app.dto';
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
            signIn: jest.fn().mockResolvedValue({ token: 'mockToken' }),
          },
        },
      ],
    }).compile();

    authAppController = app.get<AuthAppController>(AuthAppController);
  });

  it('signIn', async () => {
    const postAuthAppRequestDto = new PostAuthAppRequestDto();
    postAuthAppRequestDto.email = 'test@test.com';
    postAuthAppRequestDto.password = '1234';

    await expect(
      authAppController.signIn(postAuthAppRequestDto),
    ).resolves.toEqual({
      token: 'mockToken',
    });
  });
});