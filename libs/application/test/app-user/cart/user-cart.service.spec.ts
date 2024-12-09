import { Test, TestingModule } from '@nestjs/testing';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { AppUserCartService } from '@application/app-user/cart/app-user-cart.service';
import { AppUserCartRepo } from '@application/app-user/cart/app-user-cart.repo';
import { AppUserCart } from '@domain/app-user/app-user-cart.entity';
import { userCartStub } from '../../../../domain/test/app-user/_stub/user-cart.stub';
import { appUserStub } from '../../../../domain/test/app-user/_stub/app-user.stub';
import { productStub1 } from '../../../../domain/test/product/_stub/product.stub';

describe('UserCartService', () => {
  let userCartService: AppUserCartService;
  let userCartRepo: AppUserCartRepo;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppUserCartService,
        {
          provide: AppUserCartRepo,
          useValue: {
            save: jest.fn(),
            findByUserId: jest.fn().mockResolvedValue([userCartStub]),
            findOneById: jest.fn().mockResolvedValue(userCartStub),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    userCartService = app.get(AppUserCartService);
    userCartRepo = app.get(AppUserCartRepo);
  });

  it('createUserCart', async () => {
    const dto = { productId: productStub1.id, count: 1 };

    const userCart = AppUserCart.create({
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

      const userCart = AppUserCart.create({
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
