import { Test, TestingModule } from '@nestjs/testing';
import { UserAppController } from '../user.app.controller';
import { UserAppService } from '../user.app.service';

describe('UserAppController', () => {
  let userAppController: UserAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserAppController],
      providers: [UserAppService],
    }).compile();

    userAppController = app.get<UserAppController>(UserAppController);
  });

  it('post', () => {
    const userId = 1;
    const dto = {
      zipcode: '01235',
      address: '서울시 강남구 신사동 *********',
      isDefault: false,
    };

    expect(userAppController.postUserAddress(userId, dto)).toEqual({
      id: 2,
      userId,
      ...dto,
    });
  });
});
