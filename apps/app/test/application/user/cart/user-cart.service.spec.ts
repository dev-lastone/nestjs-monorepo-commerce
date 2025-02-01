import { Test } from '@nestjs/testing';
import { ERROR_MESSAGES } from '@common/constant/error-messages';
import { UserCartService } from '../../../../src/application/user/cart/user-cart.service';
import { UserCartRepo } from '../../../../src/application/user/cart/user-cart.repo';
import { AppUserCart } from '@domain/app-user/app-user-cart.entity';
import { appUserCartStub } from '../../../../../../libs/domain/test/app-user/_stub/app-user-cart.stub';
import { appUserStub } from '../../../../../../libs/domain/test/app-user/_stub/app-user.stub';
import { productStub1 } from '../../../../../../libs/domain/test/product/_stub/product.stub';
import { SUCCESS } from '@common/constant/constants';

describe('UserCartService', () => {
  let userCartService: UserCartService;
  let userCartRepo: UserCartRepo;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        UserCartService,
        {
          provide: UserCartRepo,
          useValue: {
            save: jest.fn(),
            findByUserId: jest.fn().mockResolvedValue([appUserCartStub]),
            findOneById: jest.fn().mockResolvedValue(appUserCartStub),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    userCartService = testingModule.get(UserCartService);
    userCartRepo = testingModule.get(UserCartRepo);
  });

  it('createUserCart', async () => {
    const dto = { productId: productStub1.id, count: 1 };

    const userCart = AppUserCart.create({
      userId: appUserCartStub.userId,
      productId: appUserCartStub.productId,
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
    expect(result).toEqual([appUserCartStub]);
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
        userId: appUserCartStub.userId,
        productId: appUserCartStub.productId,
        count: dto.count,
      });

      jest.spyOn(userCartRepo, 'save').mockResolvedValue({
        id: appUserCartStub.id,
        ...userCart,
      });

      const result = await userCartService.putUserCart({
        userId: appUserCartStub.userId,
        id: appUserCartStub.id,
        ...dto,
      });

      expect(result).toEqual({
        id: appUserCartStub.id,
        userId: appUserCartStub.userId,
        productId: appUserCartStub.productId,
        count: dto.count,
      });
    });
  });

  describe('deleteUserCart', () => {
    it(ERROR_MESSAGES.UserCartNotFound, () => {
      jest.spyOn(userCartRepo, 'findOneById').mockResolvedValue(null);

      expect(() =>
        userCartService.deleteUserCart({ id: appUserStub.id, userId: 2 }),
      ).rejects.toThrow(ERROR_MESSAGES.UserCartNotFound);
    });

    it(SUCCESS, async () => {
      const result = await userCartService.deleteUserCart({
        userId: appUserCartStub.userId,
        id: appUserCartStub.id,
      });
      expect(result).toBeUndefined();
    });
  });
});
