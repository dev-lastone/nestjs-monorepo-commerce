import { Test, TestingModule } from '@nestjs/testing';
import { UserCartsAppController } from '../../carts/user-carts.app.controller';
import { UserCartsAppService } from '../../carts/user-carts.app.service';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';

describe('UserCartsAppController', () => {
  let userCartsAppController: UserCartsAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserCartsAppController],
      providers: [UserCartsAppService],
    }).compile();

    userCartsAppController = app.get<UserCartsAppController>(
      UserCartsAppController,
    );
  });

  it('post', () => {
    const dto = { productId: 1, count: 1 };
    expect(userCartsAppController.postUserCart(1, dto)).toEqual({
      id: 2,
      userId: 1,
      productId: 1,
      count: 1,
    });
  });

  it('get', () => {
    expect(userCartsAppController.getUserCarts(1)).toEqual([
      {
        id: 1,
        userId: 1,
        productId: 1,
        count: 1,
      },
    ]);
  });

  describe('put', () => {
    it(ERROR_MESSAGES.UserCartNotFound, () => {
      const dto = { count: 2 };
      expect(() => userCartsAppController.putUserCart(1, 2, dto)).toThrowError(
        ERROR_MESSAGES.UserCartNotFound,
      );
    });

    it('성공', () => {
      const dto = { count: 2 };
      expect(userCartsAppController.putUserCart(1, 1, dto)).toEqual({
        id: 1,
        userId: 1,
        productId: 1,
        count: 2,
      });
    });
  });
});
