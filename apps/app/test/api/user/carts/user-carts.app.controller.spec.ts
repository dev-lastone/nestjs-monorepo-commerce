import { Test } from '@nestjs/testing';
import { AppUserCartService } from '@application/app-user/cart/app-user-cart.service';
import { UserCartsAppController } from '../../../../src/api/user/carts/user-carts.app.controller';
import { productStub1 } from '../../../../../../libs/domain/test/product/_stub/product.stub';
import { userCartStub } from '../../../../../../libs/domain/test/app-user/_stub/user-cart.stub';
import { userStub } from '../../../../../../libs/domain/test/user/stub/user.stub';

describe('UserCartsAppController', () => {
  let userCartsAppController: UserCartsAppController;
  let userCartService: AppUserCartService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [UserCartsAppController],
      providers: [
        {
          provide: AppUserCartService,
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
    userCartService = testingModule.get(AppUserCartService);
  });

  it('postUserCart', () => {
    const dto = { productId: productStub1.id, count: 1 };

    userCartsAppController.postUserCart(userStub.id, dto);

    expect(userCartService.createUserCart).toBeCalledWith({
      userId: userStub.id,
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
