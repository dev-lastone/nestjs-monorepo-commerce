import { Test, TestingModule } from '@nestjs/testing';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { productStub1 } from '@domain/product/__stub/product.stub';
import { appUserStub } from '@domain/app-user/__stub/app-user.stub';
import { UserCartService } from '@application/app-user/cart/user-cart.service';
import { userCartStub } from '../__stub/user-cart.stub';
import { UserCartRepo } from '@application/app-user/cart/user-cart.repo';
import { UserCart } from '../user-cart.entity';

describe('UserCartService', () => {
  let userCartService: UserCartService;
  let userCartRepo: UserCartRepo;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UserCartService,
        {
          provide: UserCartRepo,
          useValue: {
            save: jest.fn(),
            findByUserId: jest.fn().mockResolvedValue([userCartStub]),
            findOneById: jest.fn().mockResolvedValue(userCartStub),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    userCartService = app.get(UserCartService);
    userCartRepo = app.get(UserCartRepo);
  });

  it('createUserCart', async () => {
    const dto = { productId: productStub1.id, count: 1 };

    const userCart = UserCart.create({
      userId: userCartStub.userId,
      productId: userCartStub.productId,
      count: dto.count,
    });

    jest.spyOn(userCartRepo, 'save').mockResolvedValue({
      id: 2,
      ...userCart,
    });

    const result = await userCartService.createUserCart({
      userId: appUserStub.id,
      ...dto,
    });
    expect(result).toEqual({
      id: 2,
      userId: appUserStub.id,
      productId: dto.productId,
      count: dto.count,
    });
  });

  it('getUserCarts', async () => {
    const result = await userCartService.getUserCarts(appUserStub.id);
    expect(result).toEqual([userCartStub]);
  });

  describe('putUserCart', () => {
    it(ERROR_MESSAGES.UserCartNotFound, () => {
      const dto = { count: 2 };

      jest.spyOn(userCartRepo, 'findOneById').mockResolvedValue(null);

      expect(() =>
        userCartService.putUserCart({ id: appUserStub.id, userId: 2, ...dto }),
      ).rejects.toThrow(ERROR_MESSAGES.UserCartNotFound);
    });

    it('성공', async () => {
      const dto = { count: 2 };

      const userCart = UserCart.create({
        userId: userCartStub.userId,
        productId: userCartStub.productId,
        count: dto.count,
      });

      jest.spyOn(userCartRepo, 'save').mockResolvedValue({
        id: userCartStub.id,
        ...userCart,
      });

      const result = await userCartService.putUserCart({
        userId: userCartStub.userId,
        id: userCartStub.id,
        ...dto,
      });

      expect(result).toEqual({
        id: userCartStub.id,
        userId: userCartStub.userId,
        productId: userCartStub.productId,
        count: dto.count,
      });
    });
  });

  it('deleteUserCart', async () => {
    const result = await userCartService.deleteUserCart({
      userId: userCartStub.userId,
      id: userCartStub.id,
    });
    expect(result).toBeUndefined();
  });
});
