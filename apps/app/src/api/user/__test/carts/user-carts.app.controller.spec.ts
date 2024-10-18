import { Test } from '@nestjs/testing';
import { UserCartsAppController } from '../../carts/user-carts.app.controller';
import { UserCartService } from '../../../../domain/user/cart/user-cart.service';
import { productStub1 } from '@domain/product/__stub/product.stub';
import { appUserStub } from '@domain/app-user/__stub/app-user.stub';
import { userCartStub } from '../../../../domain/user/cart/__stub/user-cart.stub';

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

    userCartsAppController.postUserCart(appUserStub.id, dto);

    expect(userCartService.createUserCart).toBeCalledWith({
      userId: appUserStub.id,
      productId: dto.productId,
      count: dto.count,
    });
  });

  it('getUserCarts', () => {
    userCartsAppController.getUserCarts(appUserStub.id);

    expect(userCartService.getUserCarts).toBeCalledWith(appUserStub.id);
  });

  it('putUserCart', () => {
    const dto = { count: 2 };
    userCartsAppController.putUserCart(
      userCartStub.userId,
      userCartStub.id,
      dto,
    );

    expect(userCartService.putUserCart).toBeCalledWith({
      userId: userCartStub.userId,
      id: userCartStub.id,
      count: dto.count,
    });
  });

  it('delete', () => {
    userCartsAppController.deleteUserCart(userCartStub.userId, userCartStub.id);

    expect(userCartService.deleteUserCart).toBeCalledWith({
      userId: userCartStub.userId,
      id: userCartStub.id,
    });
  });
});
