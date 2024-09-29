import { Test, TestingModule } from '@nestjs/testing';
import { UserCartsAppController } from '../../carts/user-carts.app.controller';
import { UserCartsAppService } from '../../carts/user-carts.app.service';

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
      id: 1,
      userId: 1,
      productId: 1,
      count: 1,
    });
  });
});
