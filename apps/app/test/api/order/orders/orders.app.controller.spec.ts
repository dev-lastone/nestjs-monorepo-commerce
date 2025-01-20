import { Test } from '@nestjs/testing';
import { OrdersAppController } from '../../../../src/api/order/orders/orders.app.controller';
import { OrdersAppService } from '../../../../src/api/order/orders/orders.app.service';
import { userStub } from '../../../../../../libs/domain/test/user/stub/user.stub';
import { appUserAddressStub } from '../../../../../../libs/domain/test/app-user/_stub/app-user-address.stub';
import {
  productStub1,
  productStub2,
} from '../../../../../../libs/domain/test/product/_stub/product.stub';

describe('OrdersAppController', () => {
  let ordersAppController: OrdersAppController;
  let ordersAppService: OrdersAppService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [OrdersAppController],
      providers: [
        {
          provide: OrdersAppService,
          useValue: {
            postOrder: jest.fn(),
            getOrders: jest.fn(),
          },
        },
      ],
    }).compile();

    ordersAppController = testingModule.get(OrdersAppController);
    ordersAppService = testingModule.get(OrdersAppService);
  });

  it('postOrder', () => {
    const userId = userStub.id;
    const dto = {
      userAddressId: appUserAddressStub.id,
      productIds: [productStub1.id, productStub2.id],
      point: 0,
    };
    ordersAppController.postOrder(userId, dto);

    expect(ordersAppService.postOrder).toBeCalledWith({ ...dto, userId });
  });

  it('getOrders', () => {
    const userId = userStub.id;
    ordersAppController.getOrders(userId);

    expect(ordersAppService.getOrders).toBeCalledWith(userId);
  });
});
