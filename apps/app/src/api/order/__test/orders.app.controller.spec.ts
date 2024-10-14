import { Test } from '@nestjs/testing';
import { OrdersAppController } from '../orders.app.controller';
import { OrdersAppService } from '../orders.app.service';

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
    ordersAppController.postOrder(1, {
      productIds: [1, 2],
    });

    expect(ordersAppService.postOrder).toBeCalledWith(1, {
      productIds: [1, 2],
    });
  });

  it('getOrders', () => {
    ordersAppController.getOrders(1);

    expect(ordersAppService.getOrders).toBeCalledWith(1);
  });
});
