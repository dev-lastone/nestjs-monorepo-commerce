import { Test } from '@nestjs/testing';
import { OrdersAppService } from '../../../../src/api/order/orders/orders.app.service';
import {
  productStub1,
  productStub2,
} from '../../../../../../libs/domain/test/product/_stub/product.stub';
import { orderStub } from '../../../../../../libs/domain/test/order/_stub/order.stub';
import { OrderService } from '@application/order/order.service';
import { userStub } from '../../../../../../libs/domain/test/user/stub/user.stub';
import { OrdersAppRepo } from '../../../../src/api/order/orders/orders.app.repo';

describe('OrdersAppService', () => {
  let ordersAppService: OrdersAppService;
  let orderService: OrderService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [
        OrdersAppService,
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn(),
          },
        },
        {
          provide: OrdersAppRepo,
          useValue: {
            findByUserId: jest.fn().mockReturnValue([orderStub]),
          },
        },
      ],
    }).compile();

    ordersAppService = testingModule.get(OrdersAppService);
    orderService = testingModule.get(OrderService);
  });

  it('postOrder', () => {
    const dto = {
      userId: userStub.id,
      userAddressId: 1,
      productIds: [productStub1.id, productStub2.id],
      point: 0,
    };

    ordersAppService.postOrder(dto);

    expect(orderService.createOrder).toBeCalledWith(dto);
  });

  it('getOrders', async () => {
    const result = await ordersAppService.getOrders(userStub.id);
    expect(result).toEqual([orderStub]);
  });
});
