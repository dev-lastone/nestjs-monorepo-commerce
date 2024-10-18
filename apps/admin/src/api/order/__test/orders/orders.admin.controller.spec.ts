import { Test } from '@nestjs/testing';
import { orderStub } from '@domain/order/__stub/order.stub';
import { OrdersAdminController } from '../../orders/orders.admin.controller';
import { OrdersAdminService } from '../../orders/orders.admin.service';

describe('OrdersAdminController', () => {
  let ordersAdminController: OrdersAdminController;
  let ordersAdminService: OrdersAdminService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [OrdersAdminController],
      providers: [
        {
          provide: OrdersAdminService,
          useValue: {
            getOrders: jest.fn().mockReturnValue([orderStub]),
            getOrder: jest.fn().mockReturnValue(orderStub),
          },
        },
      ],
    }).compile();

    ordersAdminController = testingModule.get(OrdersAdminController);
    ordersAdminService = testingModule.get(OrdersAdminService);
  });

  it('getOrders', () => {
    ordersAdminController.getOrders();

    expect(ordersAdminService.getOrders).toBeCalled();
  });

  it('getOrder', () => {
    ordersAdminController.getOrder(orderStub.id);

    expect(ordersAdminService.getOrder).toBeCalledWith(orderStub.id);
  });
});
