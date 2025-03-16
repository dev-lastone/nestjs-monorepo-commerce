import { Test } from '@nestjs/testing';
import { UserCartService } from '../../../../src/application/user/cart/user-cart.service';
import { UserCartsAppController } from '../../../../src/api/user/carts/user-carts.app.controller';
import { productStub1 } from '../../../../../../libs/domain/test/product/_stub/product.stub';
import { appUserCartStub } from '../../../../../../libs/domain/test/app-user/_stub/app-user-cart.stub';
import { userStub } from '../../../../../../libs/domain/test/user/stub/user.stub';

describe('UserCartsAppController', () => {
  let userCartsAppController: UserCartsAppController;
  let userCartService: UserCartService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [UserCartsAppController],
      providers: [
        {
          provide: UserCartService,
          useValue: {
            createUserCart: jest.fn(),
            getUserCarts: jest.fn(),
            putUserCart: jest.fn(),
            deleteUserCart: jest.fn(),
          },
        },
      ],
    }).compile();

    userCartsAppController = testingModule.get(UserCartsAppController);
    userCartService = testingModule.get(UserCartService);
  });

  it('postUserCart', () => {
    const dto = { productId: productStub1.id, count: 1 };

    userCartsAppController.postUserCart(userStub.id, dto);

    expect(userCartService.createUserCart).toBeCalledWith(userStub.id, {
      productId: dto.productId,
      count: dto.count,
    });
  });

  it('getUserCarts', () => {
    userCartsAppController.getUserCarts(userStub.id);

    expect(userCartService.getUserCarts).toBeCalledWith(userStub.id);
  });

  it('putUserCart', () => {
    const dto = { count: 2 };
    userCartsAppController.putUserCart(
      appUserCartStub.userId,
      appUserCartStub.id,
      dto,
    );

    expect(userCartService.putUserCart).toBeCalledWith({
      userId: appUserCartStub.userId,
      id: appUserCartStub.id,
      count: dto.count,
    });
  });

  it('delete', () => {
    userCartsAppController.deleteUserCart(
      appUserCartStub.userId,
      appUserCartStub.id,
    );

    expect(userCartService.deleteUserCart).toBeCalledWith({
      userId: appUserCartStub.userId,
      id: appUserCartStub.id,
    });
  });
});
