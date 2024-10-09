import { Test, TestingModule } from '@nestjs/testing';
import { UserCartsAppController } from '../../carts/user-carts.app.controller';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';
import { UserCartService } from '../../../../domain/user/cart/user-cart.service';
import { productStub1 } from '@domain/domain/product/__stub/product.stub';
import { appUserStub } from '@domain/domain/user/__stub/app-user.stub';
import { userCartStub } from '../../../../domain/user/cart/__stub/user-cart.stub';

describe('UserCartsAppController', () => {
  let userCartsAppController: UserCartsAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserCartsAppController],
      providers: [UserCartService],
    }).compile();

    userCartsAppController = app.get<UserCartsAppController>(
      UserCartsAppController,
    );
  });

  it('post', () => {
    const dto = { productId: productStub1.id, count: 1 };
    expect(userCartsAppController.postUserCart(appUserStub.id, dto)).toEqual({
      id: 2,
      userId: appUserStub.id,
      productId: dto.productId,
      count: dto.count,
    });
  });

  it('get', () => {
    expect(userCartsAppController.getUserCarts(appUserStub.id)).toEqual([
      userCartStub,
    ]);
  });

  describe('put', () => {
    it(ERROR_MESSAGES.UserCartNotFound, () => {
      const dto = { count: 2 };
      expect(() =>
        userCartsAppController.putUserCart(appUserStub.id, 2, dto),
      ).toThrowError(ERROR_MESSAGES.UserCartNotFound);
    });

    it('성공', () => {
      const dto = { count: 2 };
      expect(
        userCartsAppController.putUserCart(
          userCartStub.userId,
          userCartStub.id,
          dto,
        ),
      ).toEqual({
        id: userCartStub.id,
        userId: userCartStub.userId,
        productId: userCartStub.productId,
        count: dto.count,
      });
    });
  });

  it('delete', () => {
    expect(
      userCartsAppController.deleteUserCart(
        userCartStub.userId,
        userCartStub.id,
      ),
    ).toBeUndefined();
  });
});
