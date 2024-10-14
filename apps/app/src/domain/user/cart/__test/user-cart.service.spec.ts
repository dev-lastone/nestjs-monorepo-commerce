import { Test, TestingModule } from '@nestjs/testing';
import { ERROR_MESSAGES } from '@common/common/constant/error-messages';
import { productStub1 } from '@domain/domain/product/__stub/product.stub';
import { appUserStub } from '@domain/domain/app-user/__stub/app-user.stub';
import { UserCartService } from '../user-cart.service';
import { userCartStub } from '../__stub/user-cart.stub';

describe('UserCartService', () => {
  let userCartService: UserCartService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [UserCartService],
    }).compile();

    userCartService = app.get(UserCartService);
  });

  it('createUserCart', () => {
    const dto = { productId: productStub1.id, count: 1 };
    expect(
      userCartService.createUserCart({ userId: appUserStub.id, ...dto }),
    ).toEqual({
      id: 2,
      userId: appUserStub.id,
      productId: dto.productId,
      count: dto.count,
    });
  });

  it('getUserCarts', () => {
    expect(userCartService.getUserCarts(appUserStub.id)).toEqual([
      userCartStub,
    ]);
  });

  describe('putUserCart', () => {
    it(ERROR_MESSAGES.UserCartNotFound, () => {
      const dto = { count: 2 };
      expect(() =>
        userCartService.putUserCart({ id: appUserStub.id, userId: 2, ...dto }),
      ).toThrowError(ERROR_MESSAGES.UserCartNotFound);
    });

    it('성공', () => {
      const dto = { count: 2 };
      expect(
        userCartService.putUserCart({
          userId: userCartStub.userId,
          id: userCartStub.id,
          ...dto,
        }),
      ).toEqual({
        id: userCartStub.id,
        userId: userCartStub.userId,
        productId: userCartStub.productId,
        count: dto.count,
      });
    });
  });

  it('deleteUserCart', () => {
    expect(
      userCartService.deleteUserCart({
        userId: userCartStub.userId,
        id: userCartStub.id,
      }),
    ).toBeUndefined();
  });
});
